(function () {
  "use strict";

  // Call the initialize API first
  microsoftTeams.app.initialize().then(function () {
    microsoftTeams.app.getContext().then(function (context) {
      if (context?.app?.host?.name) {
        updateHubState(context.app.host.name);
      }
    });   
  });
  useEffect(() => {
    // Function to initialize the Microsoft Teams SDK
    microsoftTeams.initialize();

    // Get current channel information
    microsoftTeams.getContext((context) => {
      console.log('Current context:', context);
      // Use context to get channel information
      const channelId = context.channelId;
      const teamId = context.teamId;

      // Use the obtained IDs to fetch channels
      microsoftTeams
        .teamsClient
        .conversations
        .getConversationMembers({ groupId: teamId, channelId: channelId })
        .then((channelsResponse) => {
          console.log('Channels in the current team:', channelsResponse);
          // Handle channel list
          // Display channels in your React component
        })
        .catch((error) => {
          console.error('Error getting channels:', error);
        });
    });
  }, []);
  const getUserGroups = () => {
    // Get user context
    microsoftTeams.getContext((context) => {
      const userId = context.userObjectId;

      // Use userId to get user's groups
      microsoftTeams
        .teamsClient
        .getUserJoinedTeams()
        .then((teams) => {
          // teams will contain the teams the user is a part of
          const teamIds = teams.map((team) => team.id);

          // Use teamIds to get the groups
          microsoftTeams
            .teamsClient
            .getTeamMembers(teamIds)
            .then((teamMembers) => {
              console.log('Team Members:', teamMembers);
              // Process teamMembers data as needed
              setGroups(teamMembers);
            })
            .catch((error) => {
              console.error('Error getting team members:', error);
            });
        })
        .catch((error) => {
          console.error('Error getting joined teams:', error);
        });
    });
  };
  function updateHubState(hubName) {
    if (hubName) {
      document.getElementById("hubState").innerHTML = "in " + hubName;
    }
  }
})();
