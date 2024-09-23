// Set up Settlement class
export default class Settlement {
    constructor(roll, player, resource, type, enabled) {
        this.roll=roll
        this.player=player
        this.resource=resource
        this.type=type
        this.enabled=enabled
    }
  
    // Switch from enabled to disabled, or vice versa
    toggleEnabled() {
        this.enabled = !this.enabled
    }
  
    // Switch from Settlement to City and back
    switchType() {
        this.type = this.type === "Settlement" ? "City" : "Settlement"
    }
  }