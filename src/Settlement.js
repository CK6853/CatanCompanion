export default class Settlement {
    constructor(roll, player, resource, type, enabled) {
        this.roll=roll
        this.player=player
        this.resource=resource
        this.type=type
        this.enabled=enabled
    }

    toggleEnabled() {
        this.enabled = !this.enabled
    }

    switchType() {
        this.type = this.type === "Settlement" ? "City" : "Settlement"
    }
}