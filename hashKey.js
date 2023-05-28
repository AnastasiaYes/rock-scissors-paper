import crypto from 'crypto';
export default class HashKey {
    constructor() {
        this.secretKey = '';
    }

    key(choice) {
        this.secretKey = crypto.randomBytes(32).toString('hex');
        return crypto.createHmac('sha3-256', this.secretKey).update(choice).digest("hex");
    }
}