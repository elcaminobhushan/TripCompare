interface Transport {
  id: string;
  type: 'flight' | 'train' | 'bus' | 'ferry';
  name: string;
  description: string;
}

const transport: Transport[] = [
  {
    id: "trans1",
    type: "flight",
    name: "International Flight",
    description: "Round-trip international flights with premium carriers"
  },
  {
    id: "trans2",
    type: "train",
    name: "Swiss Rail",
    description: "First-class Swiss Rail pass for intercity travel"
  },
  {
    id: "trans3",
    type: "bus",
    name: "Airport Transfer",
    description: "Private airport transfer service"
  }
];

export const getTransportById = (id: string): Transport | undefined => {
  return transport.find(t => t.id === id);
};