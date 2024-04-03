import React from 'react';
import ClientsCard from './ClientsCard';

const Clients = () => {
  const clients = [
    {
      "client": {
        "name": "John Doe",
        "image": "https://example.com/client1_image.jpg"
      },
      "date": "2024-04-02",
      "time": "10:00 AM",
      "paragraph_text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
      "client": {
        "name": "Jane Smith",
        "image": "https://example.com/client2_image.jpg"
      },
      "date": "2024-04-02",
      "time": "11:00 AM",
      "paragraph_text": "Sed vitae leo nec arcu dictum ultricies."
    },
    {
      "client": {
        "name": "Michael Johnson",
        "image": "https://example.com/client3_image.jpg"
      },
      "date": "2024-04-03",
      "time": "12:00 PM",
      "paragraph_text": "Nulla facilisi. Integer vestibulum magna sit amet nibh convallis."
    },
    {
      "client": {
        "name": "Emily Brown",
        "image": "https://example.com/client4_image.jpg"
      },
      "date": "2024-04-03",
      "time": "1:00 PM",
      "paragraph_text": "Cras dignissim, purus non lacinia euismod, ex ipsum rhoncus ipsum, sed vestibulum dolor odio sed lorem."
    },
  ];

  return (
    <div>
      {clients.map((client, index) => (
        <ClientsCard
          key={index}
          client={client.client}
          date={client.date}
          time={client.time}
          paragraphText={client.paragraph_text}
        />
      ))}
    </div>
  );
};

export default Clients;
