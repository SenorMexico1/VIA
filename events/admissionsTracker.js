module.exports = {
  name: "message",
  run: async (message, client) => {
    // Check to see if the message was sent in accepted-applicants or denied-applicants
    if (message.channel.id === "626584337365860352" || message.channel.id === "649317675717361668") {
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      const creds = require("../client_secret2.json");
      const doc = new GoogleSpreadsheet("1wdJB8HiCeMI8tv8PF7YyvX8703DQXmF7hfk4cq6MO9g");
      
      const startIndex = 6;
      const endIndex = 34;
      
      // Function to access and update spreadsheet
      async function accessSpreadsheet() {
        // Get authentication to edit spreadsheet
        await doc.useServiceAccountAuth({
          client_email: creds.client_email,
          private_key: creds.private_key
        });
        await doc.loadInfo();
        const sheet = doc.sheetsById[1904599940];
        
        await sheet.loadCells('B7:D34');
        
        //Get date data
        let currentDate = new Date();
        let cDate = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        let cTime = currentDate.getHours()    + ":" + currentDate.getMinutes()     + ":" + currentDate.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        
        // Update stats
        var dataIndex = 6;
        var didUpdate = false;
        for (var i = startIndex; i < endIndex; i++) {
          const nameCell  = sheet.getCell(i, 1);
          const timeCell  = sheet.getCell(i, 2);
          const countCell = sheet.getCell(i, 3);
          
          if (nameCell.value) {
            dataIndex++;
          }
          
          if (!didUpdate && nameCell.value == message.member.displayName) {
            didUpdate = true;
            timeCell.value = dateTime;
            countCell.value += 1;
          }
        }
        
        if (!didUpdate && dataIndex < endIndex) {
          const nameCell  = sheet.getCell(dataIndex, 1);
          const timeCell  = sheet.getCell(dataIndex, 2);
          const countCell = sheet.getCell(dataIndex, 3);
          
          nameCell.value = message.member.displayName;
          timeCell.value = dateTime;
          countCell.value = 1;
        }
        await sheet.saveUpdatedCells();
      }
      accessSpreadsheet();
    }
    // Not in right channel, return nothing
    else {
      return;
    }
  }
}
