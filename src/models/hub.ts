interface HubType {
    browserTimeout: number
    debug: boolean
    host: string
    port: number
    role: string
    timeout: number
    cleanUpCycle: number
    capabilityMatcher: string
    newSessionWaitTimeout: number
    throwOnCapabilityNotPresent: boolean
    registry: string
}

export default HubType;
