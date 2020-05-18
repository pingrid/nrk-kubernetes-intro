## Rolling updates
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
