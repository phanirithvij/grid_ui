import CapabilitiesType from "./capabilities";

interface NodeType {
    id: string;
    capabilities: CapabilitiesType[];
    uri: string;
    status: string;
    maxSession: number;
}

export default NodeType;
