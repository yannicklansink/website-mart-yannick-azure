module.exports = async function (context, req) {
  if (req.method === 'POST') {
    // Verwerk POST data
    const data = req.body;
    // Doe iets met de data
    console.log('test function');
    console.log(data);
    context.res.json({
      text: 'Data ontvangen',
    });
  } else if (req.method === 'GET') {
    context.res.json({
      text: 'Hello from the API',
    });
  }
};
