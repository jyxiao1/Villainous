import Phaser from 'phaser'


class DragRotatorAxisInfo{
    constructor() {
        this.m_forceMultiplier = 0;
        this.m_minDegrees = 0;
        this.m_maxDegrees = 0;
        this.m_restSeconds = 0;
    }
}

class DragRotatorInfo{
    constructor() {
        this.m_pitchInfo = new DragRotatorAxisInfo();
        this.m_rollInfo = new DragRotatorAxisInfo();
    }
}

export default class DragRotator extends Phaser.GameObjects.GameObject
{
    constructor(scene, type) {
        super(scene, type);
        this.m_info = new DragRotatorInfo();
        this.m_pitchDeg = 0;
        this.m_rollDeg = 0;
        this.m_pitchVel = 0;
        this.m_rollVel = 0;
        this.m_prevPos = new Phaser.Math.Vector3();
        this.m_originalAngles = new Phaser.Math.Vector3();

    }

    static get EPSILON() {
        return 0.0001;
    }

    static get SMOOTH_DAMP_SEC_FUDGE() {
        return 0.1;
    }

    Reset()
    {
        this.m_prevPos = this.transform.position;
        this.transform.localRotation = Phaser.Math.Quaternion //.Euler(this.m_originalAngles);
        this.m_rollDeg = 0.0;
        this.m_rollVel = 0.0;
        this.m_pitchDeg = 0.0;
        this.m_pitchVel = 0.0;
    }

    Awake()
    {
        Reset();
        this.m_prevPos = this.transform.position;
        this.m_originalAngles = this.transform.localRotation.eulerAngles;

    }

    Update()
    {
        let position = this.transform.position;
        let vector3 = position - this.m_prevPos;
        if (vector3.sqrMagnitude > 9.99999974737875E-05)
        {
            this.m_pitchDeg += vector3.y * this.m_info.m_pitchInfo.m_forceMultiplier;
            this.m_pitchDeg = Phaser.Math.Clamp(this.m_pitchDeg, this.m_info.m_pitchInfo.m_minDegrees, this.m_info.m_pitchInfo.m_maxDegrees);
            this.m_rollDeg -= vector3.x * this.m_info.m_rollInfo.m_forceMultiplier;
            this.m_rollDeg = Phaser.Math.Clamp(this.m_rollDeg, this.m_info.m_rollInfo.m_minDegrees, this.m_info.m_rollInfo.m_maxDegrees);
        }
        this.m_pitchDeg = Phaser.Math.SmoothDamp(this.m_pitchDeg, 0.0, this.m_pitchVel, this.m_info.m_pitchInfo.m_restSeconds * 0.1);
        this.m_rollDeg = Phaser.Math.SmoothDamp(this.m_rollDeg, 0.0, this.m_rollVel, this.m_info.m_rollInfo.m_restSeconds * 0.1);
        this.transform.localRotation = this.transform.localRotation.setFromEuler(new Phaser.Math.Euler(
                                                                    this.m_originalAngles.x + this.m_pitchDeg,
                                                                    this.m_originalAngles.y + this.m_rollDeg,
                                                                    this.m_originalAngles.z));
        this.m_prevPos = position;
    }

    // GetInfo()
    // {
    //     return this.m_info;
    // }
    //
    // SetInfo(DragRotatorInfo info)
    // {
    //     this.m_info = info;
    // }

}
