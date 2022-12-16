# BoreDM-Field

## What is BoreDM Field?

BoreDM Field is a web app that allows geotechnical engineers to enter soil-sample information into an online database for secure storage. It is a user-based system that incorporates authentication to ensure users only have access to their own data.

From a given user’s perspective, data is organized in a three-tier hierarchy. Each user can can access multiple ‘projects’ (the significance of a project is determined by the user), each project consists of one or more ‘borings’ (a boring represents drilling that occurred at a particular set of coordinates), and each boring contains one or more ‘Samples’ (a Sample represents soil taken at a particular depth). Each tier has a set of data that is associated with it– see the database schema for more detail.

Data is collected using an intuitive user-interface that utilizes preconfigured selections to facilitate speed. Once a user submits a set of samples associated with a given boring, a graphic is automatically generated that summarizes the information extrapolated from the whole of collected samples; therefore, each boring has one graphic associated with it.

In addition to data entry and retrieval, BoreDM will integrate a map feature that allows users to view, select, and submit boring locations by simply scrolling and tapping on a navigable map interface. We also would also like to add a feature that allows users to share projects or specific borings with each other, but that remains a stretch goal.

We hope that BoreDM Field will streamline the process of safe data collection by geotechnical engineers. A clean user interface preconfigured with selectable options will standardize data entry across the industry, while the map feature and automatic graphic generation will allow for an intuitive, holistic viewing of the existing data.

## Please follow the instructions below to get the simulated version of BoreDM Field running on your device

- These are also included in the _User's Guide_ as part of our app's documentation.

### The following guide will direct you in installing the necessary packages to get the app running on Expo's servers and instruct you on how to install the iOS and/or Android Emulators on your device.

- Since we have been building a native app for our project, the app is not hosted on a website, and also has not been deployed to an app store (due to the overhead in doing so in such a short time frame).
- Thankfully, React Native makes the process of testing the app fairly straightforward with the Expo service. In a few steps, it is easy to quickly bundle the frontend so that it is running on Expo servers and can be tested on your local machine.
- We have received permission from our TA advisor, Kuba Alicki, who has verified with the course instructors, to test the app using Expo
- The backend of the app has been deployed to Render, so you will not have to worry about installing anything for the purposes of the backend.
- As a result of this setup, to run the app, you will need to install some software to run the app on your machine.
- To run the app, it is important that you have reasonably good internet connection, since the app relies on many HTTP to ensure the proper data.

### If you run into any issues during the installation/setup process, please do not hesitate to reach out to Daniel at df19@princeton.edu to troubleshoot.

### **Disclaimer: when we personally developed the app, we used Mac computers. Regardless, we tried to make this guide as platform-agnostic as possible. In any case, there may still be discrepancies between the Windows installation if you are using a Windows machine which we didn't anticipate.**

#### **Part I: Installing and setting up the repo**

- STEP 1: Navigate to our [GitHib repo](https://github.com/yabrown/BoreDM-Field) and clone it.
- STEP 2: Use `cd frontend` to navigate to the frontend of the App and run `npm install`. (You can safely ignore the warnings that appear there.)

#### **Part II: Installing the iOS and/or Android Simulators**

- STEP 3: **Disclaimer: this step can only be done if you are using a Mac**. Follow this [Expo guide](https://docs.expo.dev/workflow/ios-simulator/) to install the iOS simulator on your machine

  - If you run into further issues, take a look at [this page](https://developer.apple.com/documentation/xcode/running-your-app-in-simulator-or-on-a-device) or contact df19@princeton.edu to troubleshoot.

- STEP 4: **This can be done on both Mac and Windows**. Follow this [Expo guide](https://docs.expo.dev/workflow/android-studio-emulator/) to install the Android emulator on your machine
  - You should only need to install one device in the Virtual Device Manager. Since our app is optimized for tablet, you should install a tablet emulator. To do this, when adding a new device, select "Tablet" from the categories. Most of the options should work, but when doing the installation ourselves, we specifically went with the Nexus 9 which worked well. In general, the default setting for most of the devices should be sufficient.
  - If you run into further issues, take a look at [this page](https://developer.android.com/design-for-safety/privacy-sandbox/download#:~:text=In%20Android%20Studio%2C%20go%20to,Android%20Emulator%2C%20and%20click%20OK.) or contact df19@princeton.edu to troubleshoot.

#### **Part III: Running the App on the Installed Simulator(s)**

- STEP 5: You should now be ready to run the app on your machine.
  - **iOS Simulator (only for Mac):** If you are on a Mac and would like to run the app on the iOS simulator (preferred on Mac), first run `npm start` once in the `frontend` directory of the project. The Expo-CLI should display some output in the console. Once it has stopped displaying output, enter `i` from the keyboard. This should open the iOS simulator by default, and start installing the Expo Go app there.
    - It is likely that the simulator will open some form of iPhone by default (instead of iPad). Since the app is optimized for iPads and tablets, you should change this by going to the status bar and navigating to File -> Open Simulator -> iOS 15.5 -> and choose one of the iPads available.
  - **Android Emulator (Mac and Windows):** For the Android emulator, the device must be running before you run `npm start` from the terminal. You can do this by going into the _Virtual Device Manager_ and clicking the Play button next to the tablet device that you want to run. Once the device is running, type `a` into your terminal which should open the app on the running device and install the Expo Go app there.
  - Sometimes, when running the app, you may see a message on the device which says "Disconnected from Metro." This should not cause any issues, but you can fix this error by typing `r` in your terminal at any time to reload all of the running apps. (If this doesn't work, try using the `i` or `a` command in the terminal to retrigger Expo to open either iOS or Android and then try typing `r` again.)
  - When using the app, the device may request access to your location. Please accept these permission for the app to work as expected.
  - In order for the app to remain running, the terminal window you are using to start the frontend must remain running for the duration of the session.
  - **OPTIONAL: Running the app on your device:** Expo makes it easy to not only run the app on your computer, but also to run the app on your Android or iOS device through the Expo Go app. You can install this app on your smartphone or tablet and scan the QR code in the terminal (which you should see once running `npm start`). As mentioned the app views are not optimized for phone-sized screens, but regardless, the app will still run on these devices. You can give this a shot if you would like, but please use the simulator options above if you don't have access to a tablet to use.

#### **Part IV: Logging into the App on the Simulator**

- STEP 6: each of the four testers who are testing the app have their own unique accounts with some prepopulated data. The logins are as follows:
  - Usernames: testing1, testing2, testing3, testing4
  - Passwords (the same for all accounts): password123
