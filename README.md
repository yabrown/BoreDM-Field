# BoreDM-Field
BoreDM Field is a web app that allows geotechnical engineers to enter soil-sample information into an online database for secure storage. It is a user-based system that incorporates authentication to ensure users only have access to their own data. 

From a given user’s perspective, data is organized in a three-tier hierarchy. Each user can can access multiple ‘projects’ (the significance of a project is determined by the user), each project consists of one or more ‘borings’ (a boring represents drilling that occurred at a particular set of coordinates), and each boring contains one or more ‘Samples’ (a Sample represents soil taken at a particular depth). Each tier has a set of data that is associated with it– see the database schema for more detail. 

Data is collected using an intuitive user-interface that utilizes preconfigured selections to facilitate speed. Once a user submits a set of samples associated with a given boring, a graphic is automatically generated that summarizes the information extrapolated from the whole of collected samples; therefore, each boring has one graphic associated with it.

In addition to data entry and retrieval, BoreDM will integrate a map feature that allows users to view, select, and submit boring locations by simply scrolling and tapping on a navigable map interface. We also would also like to add a feature that allows users to share projects or specific borings with each other, but that remains a stretch goal.

We hope that BoreDM Field will streamline the process of safe data collection by geotechnical engineers. A clean user interface preconfigured with selectable options will standardize data entry across the industry, while the map feature and automatic graphic generation will allow for an intuitive, holistic viewing of the existing data. 
