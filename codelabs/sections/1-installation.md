## Installation 


### Install the Azure CLI
In order to explore the Kubernetes cluster on Azure Kubernetes Service you need to install the Azure command line tool.

Install the Azure CLI from [here](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest). 


1. To operate our cluster, we will use the Kubernetes command line tool, *kubectl*:
  ```
   az aks install-cli
  ```

The cloud SDK installs the tool for you. Kubectl is used by both Google Cloud Platform and Microsoft Azure and is used to operate Kubernetes clusters regardless of where they are hosted.

To be able to view your components, you need to login

```
az login
``` 

Then we want to view our cluster. 

```
az aks get-credentials --resource-group [INSERT RESOURCE GROUP FROM SETUP] --name [INSERT CLUSTER NAME FROM SETUP]
```

What this does is to write credentials to the file `~/.kube/config`. You can take a look at that file too see what is written to it.

If you have multiple subscriptions, you will have to set default subscription to view your clusters: 

```
az account set --subscription [SUBSCTIPTION NAME]
```

2. You can see the status of your cluster nodes here
   
   ```
   kubectl get nodes
   ```

    If the status of your nodes are `Ready`, you are ready for next step! Otherwise try setting some default config for your project. 
  
    
3. We want to set the default resource group for our cluster so that we don't have to add `--resource-group` in our commands every time.
We created our cluster in *europe-north1-a* and will set our default zone to this. 

    ```
   `az configure --defaults group=[RESOURCE GROUP NAME]`
    ``` 


**Extra task:** If you want bash autocompletion for kubectl, follow [these steps](https://kubernetes.io/docs/tasks/tools/install-kubectl/#enabling-shell-autocompletion).

### Describe components of the cluster
Now that we are authenticated, we can look at the components in our cluster by using the kubectl command.

1. Remember how Kubernetes consists of nodes? List them by this command:

    ```
   kubectl get nodes
   ```

2. If you want you can get more details about them by describing one of them:

    ```
   kubectl describe nodes <INSERT_NODE_NAME>
   ```
   
   A node is a worker machine in Kubernetes. A node may be a VM or physical machine, depending on the cluster.
