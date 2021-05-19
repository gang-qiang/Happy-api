#!/bin/bash

function boot_wait() {
    sleep 5
    declare -i counter=0
    declare -i max_counter=80 #等350秒
    declare -i total_time=0
    declare -i check_result=1

    printf "==> ${CI_PROJECT_NAME}启动中."
    until [[ $counter -ge $max_counter || "$check_result" = 0 ]];
    do
        printf "."
        ((counter+=1))
        sleep 5
        rollstatus=$(kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} rollout status deployment/${CI_PROJECT_NAME} -n ${NAMESPACE})
        if echo ${rollstatus} | grep -q successfully; then
            check_result=0
        fi
    done

    if [[ counter -ge max_counter ]];
    then
        total_time=$((counter*5))
        echo -e "\n==> \033[31m$(date) ${CI_PROJECT_NAME} 在 $total_time 秒内未启动成功!\033[0m\n"
        echo -e "==> \033[31m启动失败或检查超时，请在控制台查看应用启动情况.\033[0m"
        exit 1;
    fi

    echo -e "\n[INFO] \033[32m$(date "+%F %X") ==> Deploy OK.\033[0m"
    exit 0
}

cd gitlab-ci
if [ "$NAMESPACE"x != "online"x ];then
    if [ "$NAMESPACE"x != "pre"x ];then
        #测试配置地址
        MASTERIP=172.21.11.76
    else
        #线上和预发配置地址
        MASTERIP=172.21.10.74
    fi

    sshpass -p mhct1234 scp -o StrictHostKeyChecking=no root@${MASTERIP}:/root/.kube/config /root/kubeconfig_${MASTERIP} > /dev/null 2>&1
    if ! kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} get deployment -n ${NAMESPACE} ${CI_PROJECT_NAME}; then
        sed -i -e 's/__APPNAME/'${CI_PROJECT_NAME}'/g' -e 's#__APPIMAGE#'${IMG_TAG}'#g' -e 's/__NAMESPACE/'${NAMESPACE}'/g' fe.yaml
        if [ "$NAMESPACE"x == "pre"x ];then
            sed -i -e 's/maihaoche.net/maihaoche.com/g' -e 's/k8s/pre/g' fe.yaml
        fi
        kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} get namespaces | grep -w ${NAMESPACE} > /dev/null
        if [ $? -ne 0 ];then echo "No such namespace. ${NAMESPACE}";exit 1;fi
        kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} apply -f fe.yaml --record
    else
        echo "${CI_PROJECT_NAME} 更新镜像"
        kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} set image deployment/${CI_PROJECT_NAME} ${CI_PROJECT_NAME}=${IMG_TAG} -n ${NAMESPACE}
        boot_wait
    fi
else
    echo "线上发布"
    MASTERIP=172.21.10.74
    sshpass -p mhct1234 scp -o StrictHostKeyChecking=no root@${MASTERIP}:/root/.kube/online_config /root/kubeconfig_${MASTERIP} > /dev/null 2>&1
    if ! kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} get deployment -n ${NAMESPACE} ${CI_PROJECT_NAME}; then
        sed -i -e 's/__APPNAME/'${CI_PROJECT_NAME}'/g' -e 's#__APPIMAGE#'${IMG_TAG}'#g' -e 's/__NAMESPACE/'${NAMESPACE}'/g' fe-online.yaml
        cat fe-online.yaml
        kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} apply -f fe-online.yaml --record
    else
        echo "${CI_PROJECT_NAME} 更新镜像"
        kubectl --kubeconfig=/root/kubeconfig_${MASTERIP} set image deployment/${CI_PROJECT_NAME} ${CI_PROJECT_NAME}=${IMG_TAG} -n ${NAMESPACE}
        boot_wait
    fi
fi
