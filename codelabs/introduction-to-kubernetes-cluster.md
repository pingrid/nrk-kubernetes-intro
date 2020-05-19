author: Line Moseng and Ingrid Guren
id: pingrid-nrk-introduction-to-kubernetes-cluster

<a name="kubernetesonazure"></a>

#Kubernetes on Azure

<a name="signup"></a>

##Sign up
Create an account on Microsoft Azure
  1. Go to: https://azure.microsoft.com/en-us/free 
  2. Select Free plan
  3. Sign up. You will have to create a Microsoft account on an email you haven't used before. The first 12 months are free of charge if you don't use more than 1,650 credits. 
  Microsoft promise: *You won’t be charged unless you upgrade.*

    
<a name="createaclusterintheportal"></a>

###Create a cluster in the portal
We need a cluster where we want to run our application.

You can create the cluster both in the Portal view in your browser  or by using Azure command line tool.
We will use the Portal.

  1. Visit [Azure Portal](https://portal.azure.com/) in your browser.
     Search for  *Kubernetes Service* in the top search bar
  2. Click + Add
  3. Select *Free trial* as your subscription and add a new Resource group (ex. *intro-kubernetes-rg*). 
  4. Give the cluster the name `cv-cluster`. Remember the name of your resource group and cluster name for later. 
  5. Select Kubernetes version *1.17.3* (not very important, but that is the version we use at NRK). 
  
  6. It is possible to change machine types, networking and resources for each node in your cluster.  We won't need much resources for our application: 
  7. Change node size to *Standard B2s* and node count to *2*. 
  8. Click *Review + create*. If the validation fails you will have to do adjustments. 
  9. Click *CREATE*
Creating the cluster might take some time This may take some time, if you want you can read [this comic](https://cloud.google.com/kubernetes-engine/kubernetes-comic/) while you wait :) 


<a name="installation"></a>

##Installation


<a name="installtheazurecli"></a>

###Install the Azure CLI
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

<a name="describecomponentsofthecluster"></a>

###Describe components of the cluster
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


<a name="forkthisrepository"></a>

##Fork this repository

1. Visit [this](https://github.com/pingrid/nrk-kubernetes-intro) repository and fork it to your own Github account. 

2. Clone it to your laptop with `git clone [REPO NAME]`. 

It is possible to complete the workshop without cloning the repo to your laptop by doing the changes directly in Github and apply the files in the terminal. 



<a name="dockercontainers"></a>

##Docker containers
To create a deployment on Kubernetes, you need to specify at least one container for your application.
Kubernetes will on a deploy pull the image specified and create pods with this container.
Docker is the most commonly used container service in Kubernetes.

In this repository you will find code for both applications in the backend and frontend directories.
Each of these folders also have their own Dockerfile.
Take a look at the docker files too see how they are built up:
  - [frontend/Dockerfile](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/frontend/Dockerfile)
  - [backend/Dockerfile](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/backend/Dockerfile)
  
  
Notice the `.dockerignore` files inside both the [frontend directory](https://github.com/pingrid/nrk-kubernetes-intro/tree/master/frontend) and the [backend directory](https://github.com/pingrid/nrk-kubernetes-intro/tree/master/backend) as well.
This file tells the Docker daemon which files and directories to ignore, for example the `node_modules` directory.

One way to create Docker images is to manually create ands build images on your own computer with the Docker daemon. Instead, we are going to automatically build images by using build triggers in Google Cloud Platform.


<a name="containerregistry"></a>

###Container registry
Container registry is where we are going to push our docker images. 
Go to [Azure Container registry](https://portal.azure.com/#create/Microsoft.ContainerRegistry)(or search for Container Registry in Azure Portal).

1. Select *Free Trial* as subscription
2. Select same resource group as you created in installation&setup
3. Select your registry name (and remember it for the next tasks )


<a name="azurepipelines"></a>

###Azure pipelines
We want to automatically build our code ready for deploy with Azure pipelines. 
1. Go to [Azure pipelines in Microsoft Azure]https://azure.microsoft.com/en-gb/services/devops/pipelines/
2. Add Azure pipelines to your project (same account you logged in with), and set privacy to *public*.
3. Select `Github`
4. Give access to Azure pipelines
5. Select your forked repository
6. Select Basic for SKU
7. Click *Create*

**Configure your pipeline for the fronted-application**
1. Select *Docker: build an push an image to Azure Container Registry*
2. Select your correct subscription
3. Give it a recognizable name, ex. *cvfrontend* (remember we are going to create two 😊)
4. Review your file 
5. Click save 

If you selected your project to be private and have problems configuring your pipeline built, change it to public for now. This is just for less configuration 😊

**Configure your pipeline for the fronted-application**
Now, do the same thing for the backend applicatipon. 
Remember to change the path for your Docker file  ($(Build.SourcesDirectory)/backend/Dockerfile), and give it a new name ex. *cvbackend* 

<a name="validateandtestyourazurepipelines(buildtriggers)"></a>

###Validate and test your Azure pipelines (build triggers)
Click on pipelines and have a look at your builds. Verify that they go green. 
When we created the Azure pipelines, we added a yaml file for each of our projects to Github with a commit. Notice that when we added the second pipeline the first pipeline started building again. The reason for this is in the file _azure-pipelines.yml_ (pull new changes to look at the file):

```
trigger:
- master
```

To specify builds based only on some branches, simple change or add branches. 


<a name="changethecode"></a>

##Change the code
We want to change to code to see if it triggers a new build. 

Open the file [backend/data.js](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/backend/data.js) and edit the JSON responses to your name, workplace and education.

If you want, you can also change the background color in [frontend/index.css](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/frontend/src/index.css). 

You can either change the code in an editor or in GitHub directly. Commit and push your commit.

**Then**

Go back to the [Azure pipelines](https://dev.azure.com/) and click on your Recent pipelines to see whether the build starts building. Notice that you can follow the build log if you want to see whats going on during the building of the image.


<a name="deploytoyourkubernetescluster"></a>

##Deploy to your Kubernetes Cluster

It's time to deploy the frontend and backend to your cluster!

The preferred way to configure Kubernetes resources is to specify them in YAML files.

In the folder [yaml/](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml) you find the YAML files specifying what resources Kubernetes should create.
There are two files for specifying services and two files for specifying deployments. One for the backend application (*backend-service.yaml*) and one for the frontend application (*frontend-service.yaml*).
Same for the deployments.

1. Open the file [yaml/backend-deployment.yaml](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml/backend-deployment.yaml)
2. In the field `spec.template.spec.containers.image` insert the full name of your backend Docker image created in the previous step. 

The name should be on the form `[CONTAINER REGISTRY ID]/azurecr.io/[IMAGE NAME]:VERSION`. 
You can find the correct path of your image by going to [Azure Portal](https://portal.azure.com/) and searching for Container registry. Select your registry, then select *Repositories*. Latest version can be found under repository under Container registry. 
 
There are a few things to notice in the deployment file:
- The number of replicas is set to 3. This is the number of pods we want running at all times
- The container spec has defined port 5000, so the Deployment will open this port on the containers
- The label `app: backend` is defined three places:
  - `metadata` is used by the service, which we will look at later
  - `spec.selector.matchLabels` is how the Deployment knows which Pods to manage
  - `spec.template.metadata` is the label added to the Pods
  
3. Open the file [yaml/frontend-deployment.yaml](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml/frontend-deployment.yaml). 
4. Insert your Frontend Docker image name in the field `spec.template.spec.containers.image`.  

5. Now we need to give Kubernetes access to our container registry. 


```
kubectl create secret docker-registry <secret-name> \
  --namespace <namespace> \
  --docker-server=https://<container-registry-name>.azurecr.io \
  --docker-username=<service-principal-ID> \
  --docker-password=<service-principal-password>
  ```
  
Let secret-name be `acr-docker-secret` and use the principal service-principal-id and service-principal-password be the ones you got by running the scripts above.

Verify that you now have a secret: 
```
kubectl get secret. 
``` 

A secret is only available for resources within the cluster and is a great way to store passwords and tokens. 




*It did not work?*  Alternative ways for accessing your build images [here](https://docs.microsoft.com/en-us/azure/container-registry/container-registry-auth-kubernetes).

5. Create the resources for the backend and frontend (from root folder in the project):
  
  ```
  kubectl apply -f ./yaml/backend-deployment.yaml
  kubectl apply -f ./yaml/frontend-deployment.yaml
  ```

6. Watch the creation of pods:
  
  ```
  watch kubectl get pods
  ```

  If you don't have `watch` installed, you can use this command instead:
  
  ```
  kubectl get pods -w
  ```

  When all pods are running, quit by `ctrl + q` (or `ctrl + c` when on Windows).

<a name="aboutpods"></a>

##About pods

Pods are Kubernetes resources that mostly just contains one or more containers,
along with some Kubernetes network stuff and specifications on how to run the container(s).
All of our pods contains only one container. There are several use cases where you might want to specify several
containers in one pod, for instance if you need a proxy in front of your application.

The Pods were created when you applied the specification of the type `Deployment`, which is a controller resource. 
The Deployment specification contains a desired state and the Deployment controller changes the state to achieve this.
When creating the Deployment, it will create ReplicaSet, which it owns.

The ReplicaSet will then create the desired number of pods, and recreate them if the Deployment specification changes,
e.g. if you want another number of pods running or if you update the Docker image to use.
It will do so in a rolling-update manner, which we will explore soon.

The Pods are running on the cluster nodes. 

![Illustration of deployments, replicasets, pods and nodes.](https://storage.googleapis.com/cdn.thenewstack.io/media/2017/11/07751442-deployment.png)



*Did you noticed that the pod names were prefixed with the deployment names and two hashes?* - The first hash is the hash of the ReplicaSet, the second is unique for the Pod.

4. Explore the Deployments:
  
  ```
  kubectl get deployments
  ```

Here you can see the age of the Deployment and how many Pods that are desired in the configuration specification,
the number of running pods, the number of pods that are updated and how many that are available.

5. Explore the ReplicaSets:
  
  ```
  kubectl get replicaset
  ```

The statuses are similar to those of the Deployments, except that the ReplicaSet have no concept of updates.
If you run an update to a Deployment, it will create a new ReplicaSet with the updated specification and
tell the old ReplicaSet to scale number of pods down to zero.



<a name="createservices"></a>

##Create services
Now that our applications are running, we would like to route traffic to them.

* Open [yaml/backend-service.yaml](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml/backend-service.yaml)
  There are a few things to notice:
    - The protocol is set to TCP, which means that the Service sends requests to Pods on this protocol. UDP is also supported
    - The spec has defined port 80, so it will listen to traffic on port 80 and sends traffic to the Pods on the same port. We could also define `targetPort` if the port on the Pods are different from the incoming traffic port
    - The label `app: backend` defines that it should route requests to our Deployment with the same label

* Create the Services:

  ```
  kubectl apply -f ./yaml/backend-service.yaml
  kubectl apply -f ./yaml/frontend-service.yaml
  ```

* List the created services:
  
  ```
  kubectl get service
  ```

As you can see, both services have defined internal IPs, `CLUSTER-IP`. These internal IPs are only available inside the cluster. But we want our frontend application to be available from the internet. In order to do so, we must expose an external IP.

<a name="exposingyourapp"></a>

###Exposing your app
Ok, so now what? With the previous command, we saw that we had two services, one for our frontend and one for our backend. But they both had internal IPs, no external. We want to be able to browse our application from our browser.
Let's look at another way. The Service resource can have a different type, it can be set as a LoadBalancer.

* Open the frontend service file again
* Set `type` to be `LoadBalancer`
* Save and run

  ```
  kubectl apply -f ./yaml/frontend-service.yaml
  ```
  
* Wait for an external IP:

  ```
  watch kubectl get service frontend
  ```
  or
  
  ```
  kubectl get service frontend -w
  ```

* Visit the IP in your browser to see your amazing CV online. But something is off!
    There is no data, and if you inspect the network traffic in the browser console log, you can see that the requests to the api is responding with an error code.

    This is because the frontend application is expecting the IP of the backend Service to be set at the point of deployment.
    But we deployed the frontend application before creating the Service objects,
    meaning there was not any IP to give the frontend container on creation time.
    
* To fix this, we can delete the ReplicaSet for the frontend application:

   ```
   kubectl delete replicaset -l app=frontend
   ```

    By doing this, the Deployment will create a new ReplicaSet which will again create new Pods.
    At this time the backend Service exists and is given to the frontend application.



<a name="rollingupdates"></a>

##Rolling updates
As you read earlier, Kubernetes can update your application without down time with a rolling-update strategy. 
You will now update the background color of the frontend application, see that the build trigger creates a new image and
update the deployment to use this in your web application.

1. Open the file [frontend/src/index.css](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/frontend/src/index.css) and edit the field `background-color` to your favourite color (or the color you hate the most?)
2. Commit your changes
3. Push your changes and verify that a new verion is built on Azure pipelines as earlier. 
4. Update the image specification on the file [yaml/frontend-deployment.yaml](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml/frontend-deployment.yaml) by changing the tag to the correct version number
6. Open a new terminal window to watch the deletion and creation of Pods:
      ```
      watch kubectl get pods
      ```
      Don't close this window.

7. In the other terminal window, apply the updated Deployment specification
      ```
      kubectl apply -f ./yaml/frontend-deployment.yaml
      ```

Watch how the Pods are terminated and created in the other terminal window.
Notice that there are always at least one Pod running and that the last of the old Pods are first terminated when on of the new ones has the status running.


<a name="inspectionandlogging"></a>

##Inspection and logging
Ok, everything looks good!
But what if you need to inspect the logs and states of your applications?
Kubernetes have a built in log feature.

Let's take a look at our backend application, and see what information we can retrieve.

* View the logs of one container
  - First, list the pod names:
    
    ```
    kubectl get pods -l app=backend
    ```
    
    The flag `l` is used to filter by pods with the label `app=backend`.

  - Now, you can view the logs from one pod:
    
    ```
    kubectl logs <INSERT_THE_NAME_OF_A_POD>
    ```

  - You can also get all logs filtered by label.
      
    ```
    kubectl logs -l app=backend
    ```

* Ok, the logs were fine! Let's look at the environment variables set by Kubernetes in our containers:
  
  ```
  kubectl exec -it <INSERT_THE_NAME_OF_A_POD> -- printenv
  ```

  Here you can see that we have IP addresses and ports to our frontend service.
  These IP addresses are internal, not reachable from outside the cluster.
  You can set your own environment variables in the deployment specification.
  They will show up in this list as well.

* We can also describe our deployment, to see its statuses and pod specification:
  
  ```
  kubectl describe deployment backend
  ```
  
  Notice that `StrategyType: RollingUpdate` that we saw when we applied an updated frontend is set by default.


<a name="dns"></a>

###DNS
A cool thing in Kubernetes is the Kubernetes DNS.
Inside the cluster, Pods and Services have their own DNS record.
For example, our backend service is reachable on `backend.<NAMESPACE>.svc.cluster.local`. If you are sending the request from the same namespace, you can also reach it on `backend`.
We will take a look at this.

* Get your current namespace

  ```
  kubectl config view | grep namespace: 
  ```

  If there is no output, your namespace is `default`.

* List pods to copy a pod name

  ```
  kubectl get pods -l app=frontend
  ```

* We will run `curl` from one of our frontend containers to see that we can reach our backend internally on `http://backend.<NAMESPACE>.svc.cluster.local:5000`

  ```
  kubectl exec -it INSERT_FRONTEND_POD_NAME -- curl -v http://backend.<NAMESPACE>.svc.cluster.local:5000
  ```

  The HTTP status should be 200 along with the message "Hello, I'm alive"

* Run `curl` from the same container to see that we can reach our backend internally on the shortname `http://backend:5000` as well

  ```
  kubectl exec -it INSERT_FRONTEND_POD_NAME -- curl -v http://backend:5000
  ```

  The output should be the same as above. 
  
* To fix the issue where we had to delete the frontend ReplicaSet to get the internal IP for the backend Service could be avoided if we used the DNS instead. 



<a name="extratasks"></a>

##Extra tasks

<a name="differentmethodstoexposeaservice"></a>

###Different methods to expose a service
Right now we have exposed our frontend service by setting the service type to `LoadBalancer`.

<a name="createaningress"></a>

####Create an ingress
Another option would be to use an ingress.

An ingress is a resource that will allow traffic from outside the cluster to your services. We will now create such a resource to get an external IP and to allow requests to our frontend service.

* Open the file [yaml/ingress.yaml](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml/ingress.yaml)
  Notice that we have defined that we have configured our ingress to send requests to our `frontend` service on port `8001`.
* Create the ingress resource:
  
  ```
  kubectl apply -f ./yaml/ingress.yaml
  ```

* Wait for an external IP to be configured

  ```
  watch kubectl get ingress cv-ingress
  ```
  
  or
  
  ```
  kubectl get ingress cv-ingress -w
  ```
  
  It may take a few minutes for Kubernetes Engine to allocate an external IP address and set up forwarding rules until the load balancer is ready to serve your application. In the meanwhile, you may get errors such as HTTP 404 or HTTP 500 until the load balancer configuration is propagated across the globe.

* Visit the external IP in your preferred browser to make sure that your awesome CV is available online. If you get an error, the ingress and load balancing setup might not be completed.

<a name="notesonexposingyourapplication"></a>

####Notes on exposing your application
The LoadBalancer type is dependent on your cloud provider. Google Cloud Platform supports these features, but other providers might not.



<a name="servicetypenodeport"></a>

####Service type NodePort
Another way to expose our app is with the service type `NodePort`. If we look at our frontend service, we can see that it already is defined as this type. So we are good to go then? No, not yet.

* We will change our frontend service to be a type NodePort instead. Open the file [yaml/frontend-service.yaml](https://github.com/pingrid/nrk-kubernetes-intro/blob/master/yaml/frontend-service.yaml)
* Set the `type` to be `NodePort` and save
* Apply the changes

  ```
  kubectl apply -f ./yaml/frontend-service.yaml
  ```

* Run

  ```
  kubectl get service frontend
  ```

  We see that our service doesn't have an external IP. But what it do have is two ports, port 80 and a port in the range 30000-32767. The last port was set by the Kubernetes master when we created our service. This port we will use togheter with an external IP.

* The nodes in our cluster all have external IPs per default. Lets use one of those.

  ```
  kubectl get nodes -o wide
  ```

* Copy one of the external IPs from the output above along with the node port from our service:

  ```
  curl -v <EXTERNAL_IP>:<NODE_PORT>
  ```
  
  This will output `Connection failed`. This is because we haven't opened up requests on this port. Lets create a firewall rule that allows traffic on this port:
  
* Create a firewall rule. Switch `NODE_PORT` with the node port of your service:
  
  ```
  gcloud compute firewall-rules create cv-frontend --allow tcp:NODE_PORT
  ```
  
* Try the curl command from `6` again.  
   The output should also here be "Hello, I'm alive"

* Do the same, but replace the IP with the external IP from one of the other nodes. It should have the same result

How does this work? The nodes all have external IPs, so we can curl them. By default, neither services or pods in the cluster are exposed to the internet, but Kubernetes will open the port of `NodePort` services on all the nodes so that those services are available on <NODE_IP>:<NODE_PORT>.

<a name="notesonexposingyourapplication-1"></a>

####Notes on exposing your application
The Ingress resource is dependent on your cloud provider. Google Cloud Platform supports these features, but other providers might not.



<a name="healthchecks"></a>

###Health checks

Kubernetes is using health checks and readiness checks to figure out the state of the pods.
If the health check responds with an error status code, Kubernetes will asume the container is unhealthy and kill the pod. Simliary, if the readiness check is unsuccessful, Kubernetes will asume it is not ready, and wait for it.
You can define your own.

<a name="endpoint"></a>

###Endpoint

The first way to define a health check is to define which endpoint the check should use. Our backend application contains the endpoint `/healthz`. Go ahead and define this as the health-endpoint in the backend deployment file, under backend container in the list `spec.containers`:

```
livenessProbe:
  httpGet:
    path: /healthz
    port: 8001
    httpHeaders:
    - name: X-Custom-Header
      value: Awesome
  initialDelaySeconds: 3
  periodSeconds: 3
```

When applying the new deployment file, run `kubectl get pods` to see that that the deployment has created a new Pod. Describe it to see the new specification.

<a name="command"></a>

###Command

We can also specify a command to execute in the container. Lets do this for the frontend application:

```
livenessProbe:
  exec:
    command:
    - ls
    - /
  initialDelaySeconds: 5
  periodSeconds: 5  
```


The command can be any command available in the container. The commands available in your container depends on the base image and how you build your image.
E.g. if your container has `curl` installed, we could define that the probe is to curl the `/healtz` endpoint from the container. This wouldn't make much sence, though...



<a name="cleanup"></a>

##Clean up

You can always look at the pricing for resources [here](https://azure.microsoft.com/nb-no/pricing/calculator/) and your remaining credits by searching for *Free trial* in the portal.

**Delete your cluster** 

Be careful and only delete the cluster we have made during the workshop 😉 

```
az aks delete --name [CLUSTER NAME] --resource-group [RESOURCE GROUP NAME]
```

**Close your billing account**

Follow the steps [here](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/cancel-azure-subscription) to close your Azure Subscription. 


And your are done and your credit card will not be charged.

And that's it! ⎈


<a name="anyquestions?"></a>

###Any questions?

Contact us on [@linemoseng](https://twitter.com/linemoseng) or [@ingridguren](https://twitter.com/ingridguren).


