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

var serialNumber = (serial, antenna) =>{

    return `/iot4decision/gerdau/reader/${serial}/antenna/${antenna}`;

};

var msg = {
  "epc": "44114000001000004128987024914006",
  "buffer": "2",
  "dateTime": "Oct 10, 2020 06:45:01 PM",
  "message": 1
};

//13131904
/*
var epcs = [
'44114000001000004129036097314000',
'44114000001000004129088097814002',
'44114000001000004129088099614005',
'44114000001000004129088099914006',
];
*/

//13131906
var epcs = [
'44114000001000004128967059914001',
'44114000001000004128967059814004',
'44114000001000004128967059714007',
'44114000001000004128967059314009'
]

/*
var epcs = [
    '44114000001000004128987024914006',
    '44114000001000004278320074514001',
    '44114000001000004128959024514007',
    '44114000001000004128987030914007',
    '44114000001000004278320075514000',
    '44114000001000004268320078214009'
];
*/

var serials = [
    'KA17005966',
    'KA17005253',
    'KA17005264',
    'KB16005627'
];

setInterval(function () {  

    epcs.forEach(epc => { 
        console.log(epc);
    }); 

    serials.forEach(serial =>{
        epcs.forEach(epc => { 
            msg.epc = epc;

            for (let antenna = 1; antenna <= 2; antenna++) {
                client.publish(serialNumber(serial,antenna), JSON.stringify(msg), { qos: 0 });
            }

        }); 
    });

    console.log(`Publicado! - ${Date.now().toString()}`);

}, 1000);
