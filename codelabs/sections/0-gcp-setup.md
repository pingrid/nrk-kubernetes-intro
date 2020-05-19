##Sign up
Create an account on Microsoft Azure
  1. Go to: https://azure.microsoft.com/en-us/free 
  2. Select Free plan
  3. Sign up. You will have to create a Microsoft account on an email you haven't used before. The first 12 months are free of charge if you don't use more than 1,650 credits. 
  Microsoft promise: *You won’t be charged unless you upgrade.*

    
### Create a cluster in the portal
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
