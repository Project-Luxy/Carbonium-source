const client = new Client({
  email: process.env.FORTNITE_EMAIL, // PLEASE USE ENV VARIABLES!
  //password: process.env.FORTNITE_PASSWORD, - 
  useDeviceAuth: true,
  removeOldDeviceAuths: true,
  deviceAuthPath: './fbadeviceauths.json', // Default is './fbadeviceauths.json'
  // Cazzo ci fai qui?
  launcherToken: 'MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=',
  fortniteToken: 'ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ=',
  // iosToken: 'token' // non funziona
  autokill: true,
});

// Example of usage
(async () => {
  // EMAIL 

  // This is where the magic happen
  console.log('Success',
    await client.createDeviceAuthFromExchangeCode());

  // Perform the login process of the "client"
  console.log('Success',
    await client.authenticator.login());

  const parallel = await Promise.all([
    client.lookup.accountLookup('iXyles'),
    client.authenticator.accountId,
  ]);

  (parallel).forEach((result) => {
    console.log(result);
  });