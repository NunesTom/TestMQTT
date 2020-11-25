var mqtt = require('mqtt')

var connectionArgs = { 
    username: 'admin',
    password: 'admin',
    host: '10.131.41.155', 
    port: '1883', 
    protocol: 'mqtt',
    clientId: `TestGAGF-Listener-${Math.random()
      .toString(16)
      .substr(2, 8)}`
};

var client  = mqtt.connect(connectionArgs);

client.on('connect', (success) => { 
    //código para o connect
    console.log('Conectado no Broker')
});

client.on('close', () => { 
    //código para o close
    console.log('Desconectado no Broker')
}); 
    
client.on('error', (err) => { 
    //código para o error
    console.log(err);
}); 
    
client.on('message', (topic, message, packet) => { 
    //código para a mensagem
    console.log(message);
});

var KB16005627_1 = '/iot4decision/gerdau/reader/KB16005627/antenna/1';
var KB16005627_2 = '/iot4decision/gerdau/reader/KB16005627/antenna/2';
var KA17005253_1 = '/iot4decision/gerdau/reader/KA17005253/antenna/1';
var KA17005253_2 = '/iot4decision/gerdau/reader/KA17005253/antenna/2';
var KA17005264_1 = '/iot4decision/gerdau/reader/KA17005264/antenna/1';
var KA17005264_2 = '/iot4decision/gerdau/reader/KA17005264/antenna/2';
var KA17005966_1 = '/iot4decision/gerdau/reader/KA17005966/antenna/1';
var KA17005966_2 = '/iot4decision/gerdau/reader/KA17005966/antenna/2';

var msg = {
  "epc": "44114000001000004128987024914006",
  "buffer": "2",
  "dateTime": "Oct 10, 2020 06:45:01 PM",
  "message": 1
};

//44114000001000004278320075514000

setInterval(function () {  
    msg.epc = '44114000001000004128987024914006';
    client.publish(KA17005966_1, JSON.stringify(msg), { qos: 0 });

    msg.epc = '44114000001000004278320074514001';
    client.publish(KA17005966_2, JSON.stringify(msg), { qos: 0 });

    msg.epc = '44114000001000004128959024514007';
    client.publish(KA17005966_1, JSON.stringify(msg), { qos: 0 });

    msg.epc = '44114000001000004128987030914007';
    client.publish(KA17005966_2, JSON.stringify(msg), { qos: 0 });


    msg.epc = '44114000001000004278320075514000';    
    client.publish(KA17005253_1, JSON.stringify(msg), { qos: 0 });
    msg.epc = '44114000001000004268320078214009';   
    client.publish(KA17005253_2, JSON.stringify(msg), { qos: 0 });

    msg.epc = '44114000001000004278320075514000';  
    client.publish(KA17005264_1, JSON.stringify(msg), { qos: 0 });
    msg.epc = '44114000001000004268320078214009';  
    client.publish(KA17005264_2, JSON.stringify(msg), { qos: 0 });

    msg.epc = '44114000001000004278320075514000'; 
    client.publish(KB16005627_1, JSON.stringify(msg), { qos: 0 });
    msg.epc = '44114000001000004268320078214009';  
    client.publish(KB16005627_2, JSON.stringify(msg), { qos: 0 });

    console.log(`Publicado! - ${Date.now().toString()}`);

}, 1000);


