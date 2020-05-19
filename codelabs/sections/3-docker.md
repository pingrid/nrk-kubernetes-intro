## Docker containers
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


### Container registry
Container registry is where we are going to push our docker images. 
Go to [Azure Container registry](https://portal.azure.com/#create/Microsoft.ContainerRegistry)(or search for Container Registry in Azure Portal).

1. Select *Free Trial* as subscription
2. Select same resource group as you created in installation&setup
3. Select your registry name (and remember it for the next tasks )


### Azure pipelines
We want to automatically build our code ready for deploy with Azure pipelines. 
1. Go to [Azure pipelines in Microsoft Azure]https://azure.microsoft.com/en-gb/services/devops/pipelines/
2. Add Azure pipelines to your project (same account you logged in with), and set privacy to *public*.
3. Select `Github`
4. Give access to Azure pipelines
5. Select your forked repository
6. Select Basic for SKU
7. Click *Create*

**Configure your pipeline for the fronted-application **
1. Select *Docker: build an push an image to Azure Container Registry*
2. Select your correct subscription
3. Give it a recognizable name, ex. *cvfrontend* (remember we are going to create two 😊)
4. Review your file 
5. Click save 

If you selected your project to be private and have problems configuring your pipeline built, change it to public for now. This is just for less configuration 😊

**Configure your pipeline for the fronted-application**
Now, do the same thing for the backend applicatipon. 
Remember to change the path for your Docker file  ($(Build.SourcesDirectory)/backend/Dockerfile), and give it a new name ex. *cvbackend* 

### Validate and test your Azure pipelines (build triggers)
Click on pipelines and have a look at your builds. Verify that they go green. 
When we created the Azure pipelines, we added a yaml file for each of our projects to Github with a commit. Notice that when we added the second pipeline the first pipeline started building again. The reason for this is in the file _azure-pipelines.yml_ (pull new changes to look at the file):

```
trigger:
- master
```

To specify builds based only on some branches, simple change or add branches. 
