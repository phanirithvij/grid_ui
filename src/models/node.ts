import CapabilitiesType from "./capabilities";

interface NodeType {
    // TODO should have a platform name
    platform: string

    browserTimeout: number
    debug: boolean
    host: string
    port: number
    // enum
    role: string
    timeout: number
    cleanUpCycle: number
    maxSession: number
    downPollingLimit: number
    hub: string
    id: string
    nodePolling: number
    nodeStatusCheckTimeout: number
    proxy: string
    register: boolean
    registerCycle: number
    remoteHost: string
    unregisterIfStillDownAfter: number
    capabilities: CapabilitiesType[]
}

export default NodeType;
