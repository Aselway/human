declare module "log" {
    export function log(...msg: any[]): void;
}
declare module "sysinfo" {
    export function info(): {
        platform: any;
        agent: any;
    };
}
declare module "tfjs/backend" {
    export const config: {
        name: string;
        priority: number;
        canvas: null;
        gl: null;
        width: number;
        height: number;
        webGLattr: {
            alpha: boolean;
            antialias: boolean;
            premultipliedAlpha: boolean;
            preserveDrawingBuffer: boolean;
            depth: boolean;
            stencil: boolean;
            failIfMajorPerformanceCaveat: boolean;
            desynchronized: boolean;
        };
    };
    export function register(): void;
}
declare module "blazeface/blazeface" {
    export const disposeBox: (box: any) => void;
    export class BlazeFaceModel {
        model: any;
        anchorsData: any;
        anchors: any;
        inputSize: number;
        config: any;
        constructor(model: any, config: any);
        getBoundingBoxes(inputImage: any): Promise<{
            boxes: {
                box: any;
                landmarks: any;
                anchor: any;
                confidence: number;
            }[];
            scaleFactor: number[];
        } | null>;
    }
    export function load(config: any): Promise<BlazeFaceModel>;
}
declare module "blazeface/box" {
    export function scaleBoxCoordinates(box: any, factor: any): {
        startPoint: number[];
        endPoint: number[];
    };
    export function getBoxSize(box: any): number[];
    export function getBoxCenter(box: any): any[];
    export function cutBoxFromImageAndResize(box: any, image: any, cropSize: any): any;
    export function enlargeBox(box: any, factor?: number): {
        startPoint: number[];
        endPoint: any[];
        landmarks: any;
    };
    export function squarifyBox(box: any): {
        startPoint: number[];
        endPoint: any[];
        landmarks: any;
    };
}
declare module "blazeface/util" {
    export const IDENTITY_MATRIX: number[][];
    /**
     * Normalizes the provided angle to the range -pi to pi.
     * @param angle The angle in radians to be normalized.
     */
    export function normalizeRadians(angle: any): number;
    /**
     * Computes the angle of rotation between two anchor points.
     * @param point1 First anchor point
     * @param point2 Second anchor point
     */
    export function computeRotation(point1: any, point2: any): number;
    export function radToDegrees(rad: any): number;
    export function buildTranslationMatrix(x: any, y: any): any[][];
    export function dot(v1: any, v2: any): number;
    export function getColumnFrom2DArr(arr: any, columnIndex: any): number[];
    export function multiplyTransformMatrices(mat1: any, mat2: any): number[][];
    export function buildRotationMatrix(rotation: any, center: any): number[][];
    export function invertTransformMatrix(matrix: any): any[][];
    export function rotatePoint(homogeneousCoordinate: any, rotationMatrix: any): number[];
    export function xyDistanceBetweenPoints(a: any, b: any): number;
}
declare module "blazeface/coords" {
    export const MESH_ANNOTATIONS: {
        silhouette: number[];
        lipsUpperOuter: number[];
        lipsLowerOuter: number[];
        lipsUpperInner: number[];
        lipsLowerInner: number[];
        rightEyeUpper0: number[];
        rightEyeLower0: number[];
        rightEyeUpper1: number[];
        rightEyeLower1: number[];
        rightEyeUpper2: number[];
        rightEyeLower2: number[];
        rightEyeLower3: number[];
        rightEyebrowUpper: number[];
        rightEyebrowLower: number[];
        rightEyeIris: number[];
        leftEyeUpper0: number[];
        leftEyeLower0: number[];
        leftEyeUpper1: number[];
        leftEyeLower1: number[];
        leftEyeUpper2: number[];
        leftEyeLower2: number[];
        leftEyeLower3: number[];
        leftEyebrowUpper: number[];
        leftEyebrowLower: number[];
        leftEyeIris: number[];
        midwayBetweenEyes: number[];
        noseTip: number[];
        noseBottom: number[];
        noseRightCorner: number[];
        noseLeftCorner: number[];
        rightCheek: number[];
        leftCheek: number[];
    };
    export const MESH_TO_IRIS_INDICES_MAP: {
        key: string;
        indices: number[];
    }[];
    export const UV468: number[][];
    export const TRI468: number[];
    export const TRI68: number[];
    export const TRI33: number[];
    export const TRI7: number[];
    export const VTX68: number[];
    export const VTX33: number[];
    export const VTX7: number[];
    export const UV68: number[][];
    export const UV33: number[][];
    export const UV7: number[][];
}
declare module "blazeface/facepipeline" {
    export class Pipeline {
        storedBoxes: any;
        boundingBoxDetector: any;
        meshDetector: any;
        irisModel: any;
        boxSize: number;
        meshSize: number;
        irisSize: number;
        irisEnlarge: number;
        skipped: number;
        detectedFaces: number;
        constructor(boundingBoxDetector: any, meshDetector: any, irisModel: any);
        transformRawCoords(rawCoords: any, box: any, angle: any, rotationMatrix: any): any;
        getLeftToRightEyeDepthDifference(rawCoords: any): number;
        getEyeBox(rawCoords: any, face: any, eyeInnerCornerIndex: any, eyeOuterCornerIndex: any, flip?: boolean): {
            box: {
                startPoint: number[];
                endPoint: any[];
                landmarks: any;
            };
            boxSize: number[];
            crop: any;
        };
        getEyeCoords(eyeData: any, eyeBox: any, eyeBoxSize: any, flip?: boolean): {
            rawCoords: any[][];
            iris: any[][];
        };
        getAdjustedIrisCoords(rawCoords: any, irisCoords: any, direction: any): any;
        predict(input: any, config: any): Promise<any>;
        calculateLandmarksBoundingBox(landmarks: any): {
            startPoint: number[];
            endPoint: number[];
            landmarks: any;
        };
    }
}
declare module "blazeface/facemesh" {
    export class MediaPipeFaceMesh {
        facePipeline: any;
        config: any;
        constructor(blazeFace: any, blazeMeshModel: any, irisModel: any, config: any);
        estimateFaces(input: any, config: any): Promise<{
            confidence: any;
            boxConfidence: any;
            faceConfidence: any;
            box: any;
            mesh: any;
            boxRaw: any;
            meshRaw: any;
            annotations: any;
            image: any;
        }[]>;
    }
    export function load(config: any): Promise<MediaPipeFaceMesh>;
}
declare module "profile" {
    export const data: {};
    export function run(name: string, raw: any): void;
}
declare module "age/age" {
    export function load(config: any): Promise<any>;
    export function predict(image: any, config: any): Promise<unknown>;
}
declare module "gender/gender" {
    export function load(config: any): Promise<any>;
    export function predict(image: any, config: any): Promise<unknown>;
}
declare module "emotion/emotion" {
    export function load(config: any): Promise<any>;
    export function predict(image: any, config: any): Promise<unknown>;
}
declare module "embedding/embedding" {
    type Tensor = {};
    export function load(config: any): Promise<any>;
    export function simmilarity(embedding1: any, embedding2: any, order?: number): Number;
    export function match(embedding: Array<Number>, db: Array<any>, threshold?: number): {
        simmilarity: number;
        name: string;
        source: string;
        embedding: never[];
    };
    export function enhance(input: any): Tensor;
    export function predict(input: any, config: any): Promise<number[]>;
}
declare module "posenet/modelBase" {
    export class BaseModel {
        model: any;
        constructor(model: any);
        predict(input: any): any;
        dispose(): void;
    }
}
declare module "posenet/heapSort" {
    export class MaxHeap {
        priorityQueue: any;
        numberOfElements: number;
        getElementValue: any;
        constructor(maxSize: any, getElementValue: any);
        enqueue(x: any): void;
        dequeue(): any;
        empty(): boolean;
        size(): number;
        all(): any;
        max(): any;
        swim(k: any): void;
        sink(k: any): void;
        getValueAt(i: any): any;
        less(i: any, j: any): boolean;
        exchange(i: any, j: any): void;
    }
}
declare module "posenet/buildParts" {
    import * as heapSort from "posenet/heapSort";
    export function buildPartWithScoreQueue(scoreThreshold: any, localMaximumRadius: any, scores: any): heapSort.MaxHeap;
}
declare module "posenet/keypoints" {
    export const partNames: string[];
    export const NUM_KEYPOINTS: any;
    export const partIds: any;
    export const connectedPartIndices: any[][];
    export const poseChain: string[][];
    export const partChannels: string[];
}
declare module "posenet/vectors" {
    export function getOffsetPoint(y: any, x: any, keypoint: any, offsets: any): {
        y: any;
        x: any;
    };
    export function getImageCoords(part: any, outputStride: any, offsets: any): {
        x: any;
        y: any;
    };
    export function fillArray(element: any, size: any): any[];
    export function clamp(a: any, min: any, max: any): any;
    export function squaredDistance(y1: any, x1: any, y2: any, x2: any): number;
    export function addVectors(a: any, b: any): {
        x: any;
        y: any;
    };
    export function clampVector(a: any, min: any, max: any): {
        y: any;
        x: any;
    };
}
declare module "posenet/decoders" {
    export function getPointsConfidence(heatmapScores: any, heatMapCoords: any): Float32Array;
    export function getOffsetVectors(heatMapCoordsBuffer: any, offsetsBuffer: any): any;
    export function getOffsetPoints(heatMapCoordsBuffer: any, outputStride: any, offsetsBuffer: any): any;
    export function argmax2d(inputs: any): any;
}
declare module "posenet/decodePose" {
    export function decodePose(root: any, scores: any, offsets: any, outputStride: any, displacementsFwd: any, displacementsBwd: any): any[];
    export function decodeSinglePose(heatmapScores: any, offsets: any, minScore: any): Promise<{
        keypoints: {
            position: {
                y: any;
                x: any;
            };
            part: string;
            score: number;
        }[];
        score: number;
    }>;
}
declare module "posenet/decodeMultiple" {
    export function decodeMultiplePoses(scoresBuffer: any, offsetsBuffer: any, displacementsFwdBuffer: any, displacementsBwdBuffer: any, nmsRadius: any, maxDetections: any, scoreThreshold: any): {
        keypoints: any;
        score: number;
    }[];
}
declare module "posenet/util" {
    export function eitherPointDoesntMeetConfidence(a: any, b: any, minConfidence: any): boolean;
    export function getAdjacentKeyPoints(keypoints: any, minConfidence: any): any[];
    export function getBoundingBox(keypoints: any): any;
    export function getBoundingBoxPoints(keypoints: any): {
        x: any;
        y: any;
    }[];
    export function toTensorBuffers3D(tensors: any): Promise<[unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown, unknown]>;
    export function scalePose(pose: any, scaleY: any, scaleX: any): {
        score: any;
        keypoints: any;
    };
    export function resizeTo(image: any, [targetH, targetW]: [any, any]): any;
    export function scaleAndFlipPoses(poses: any, [height, width]: [any, any], [inputResolutionHeight, inputResolutionWidth]: [any, any]): any;
}
declare module "posenet/posenet" {
    export class PoseNet {
        baseModel: any;
        inputSize: number;
        constructor(model: any);
        estimatePoses(input: any, config: any): Promise<unknown>;
        dispose(): void;
    }
    export function load(config: any): Promise<PoseNet>;
}
declare module "handpose/box" {
    export function getBoxSize(box: any): number[];
    export function getBoxCenter(box: any): any[];
    export function cutBoxFromImageAndResize(box: any, image: any, cropSize: any): any;
    export function scaleBoxCoordinates(box: any, factor: any): {
        startPoint: number[];
        endPoint: number[];
        palmLandmarks: any;
        confidence: any;
    };
    export function enlargeBox(box: any, factor?: number): {
        startPoint: number[];
        endPoint: any[];
        palmLandmarks: any;
    };
    export function squarifyBox(box: any): {
        startPoint: number[];
        endPoint: any[];
        palmLandmarks: any;
    };
    export function shiftBox(box: any, shiftFactor: any): {
        startPoint: any[];
        endPoint: any[];
        palmLandmarks: any;
    };
}
declare module "handpose/handdetector" {
    export class HandDetector {
        model: any;
        anchors: any;
        anchorsTensor: any;
        inputSize: number;
        inputSizeTensor: any;
        doubleInputSizeTensor: any;
        constructor(model: any, inputSize: any, anchorsAnnotated: any);
        normalizeBoxes(boxes: any): any;
        normalizeLandmarks(rawPalmLandmarks: any, index: any): any;
        getBoxes(input: any, config: any): Promise<{
            box: any;
            palmLandmarks: any;
            confidence: number;
        }[]>;
        estimateHandBounds(input: any, config: any): Promise<{}[]>;
    }
}
declare module "handpose/util" {
    export function normalizeRadians(angle: any): number;
    export function computeRotation(point1: any, point2: any): number;
    export const buildTranslationMatrix: (x: any, y: any) => any[][];
    export function dot(v1: any, v2: any): number;
    export function getColumnFrom2DArr(arr: any, columnIndex: any): number[];
    export function multiplyTransformMatrices(mat1: any, mat2: any): number[][];
    export function buildRotationMatrix(rotation: any, center: any): number[][];
    export function invertTransformMatrix(matrix: any): any[][];
    export function rotatePoint(homogeneousCoordinate: any, rotationMatrix: any): number[];
}
declare module "handpose/handpipeline" {
    export class HandPipeline {
        handDetector: any;
        landmarkDetector: any;
        inputSize: number;
        storedBoxes: any;
        skipped: number;
        detectedHands: number;
        constructor(handDetector: any, landmarkDetector: any, inputSize: any);
        getBoxForPalmLandmarks(palmLandmarks: any, rotationMatrix: any): {
            startPoint: number[];
            endPoint: any[];
            palmLandmarks: any;
        };
        getBoxForHandLandmarks(landmarks: any): {
            startPoint: number[];
            endPoint: any[];
            palmLandmarks: any;
        };
        transformRawCoords(rawCoords: any, box2: any, angle: any, rotationMatrix: any): any;
        estimateHands(image: any, config: any): Promise<{}[]>;
        calculateLandmarksBoundingBox(landmarks: any): {
            startPoint: number[];
            endPoint: number[];
        };
    }
}
declare module "handpose/anchors" {
    export const anchors: {
        w: number;
        h: number;
        x_center: number;
        y_center: number;
    }[];
}
declare module "handpose/handpose" {
    export class HandPose {
        handPipeline: any;
        constructor(handPipeline: any);
        static getAnnotations(): {
            thumb: number[];
            indexFinger: number[];
            middleFinger: number[];
            ringFinger: number[];
            pinky: number[];
            palmBase: number[];
        };
        estimateHands(input: any, config: any): Promise<{
            confidence: number;
            box: any;
            boxRaw: any;
            landmarks: any;
            annotations: any;
        }[]>;
    }
    export function load(config: any): Promise<HandPose>;
}
declare module "blazepose/annotations" {
    export const full: string[];
    export const upper: string[];
}
declare module "blazepose/blazepose" {
    export function load(config: any): Promise<any>;
    export function predict(image: any, config: any): Promise<{
        keypoints: {
            id: any;
            part: any;
            position: {
                x;
                y;
                z;
            };
            score: any;
            presence: any;
        }[];
    }[] | null>;
}
declare module "nanodet/nanodet" {
    export function load(config: any): Promise<any>;
    export function predict(image: any, config: any): Promise<unknown>;
}
declare module "gesture/gesture" {
    export const body: (res: any) => {
        body: number;
        gesture: string;
    }[];
    export const face: (res: any) => {
        face: number;
        gesture: string;
    }[];
    export const iris: (res: any) => {
        iris: number;
        gesture: string;
    }[];
    export const hand: (res: any) => {
        hand: number;
        gesture: string;
    }[];
}
declare module "image/image" {
    import * as tf from '../../dist/tfjs.esm.js';
    export function process(input: any, config: any): {
        tensor: tf.Tensor;
        canvas: OffscreenCanvas | HTMLCanvasElement;
    };
}
declare module "config" {
    /**
     * Configuration interface definition for **Human** library
     *
     * Contains all configurable parameters
     */
    export interface Config {
        backend: String;
        wasmPath: String;
        debug: Boolean;
        async: Boolean;
        profile: Boolean;
        deallocate: Boolean;
        scoped: Boolean;
        videoOptimized: Boolean;
        warmup: String;
        filter: {
            enabled: Boolean;
            width: Number;
            height: Number;
            return: Boolean;
            brightness: Number;
            contrast: Number;
            sharpness: Number;
            blur: Number;
            saturation: Number;
            hue: Number;
            negative: Boolean;
            sepia: Boolean;
            vintage: Boolean;
            kodachrome: Boolean;
            technicolor: Boolean;
            polaroid: Boolean;
            pixelate: Number;
        };
        gesture: {
            enabled: Boolean;
        };
        face: {
            enabled: Boolean;
            detector: {
                modelPath: String;
                rotation: Boolean;
                maxFaces: Number;
                skipFrames: Number;
                skipInitial: Boolean;
                minConfidence: Number;
                iouThreshold: Number;
                scoreThreshold: Number;
                return: Boolean;
            };
            mesh: {
                enabled: Boolean;
                modelPath: String;
            };
            iris: {
                enabled: Boolean;
                modelPath: String;
            };
            age: {
                enabled: Boolean;
                modelPath: String;
                skipFrames: Number;
            };
            gender: {
                enabled: Boolean;
                minConfidence: Number;
                modelPath: String;
                skipFrames: Number;
            };
            emotion: {
                enabled: Boolean;
                minConfidence: Number;
                skipFrames: Number;
                modelPath: String;
            };
            embedding: {
                enabled: Boolean;
                modelPath: String;
            };
        };
        body: {
            enabled: Boolean;
            modelPath: String;
            maxDetections: Number;
            scoreThreshold: Number;
            nmsRadius: Number;
        };
        hand: {
            enabled: Boolean;
            rotation: Boolean;
            skipFrames: Number;
            skipInitial: Boolean;
            minConfidence: Number;
            iouThreshold: Number;
            scoreThreshold: Number;
            maxHands: Number;
            landmarks: Boolean;
            detector: {
                modelPath: String;
            };
            skeleton: {
                modelPath: String;
            };
        };
        object: {
            enabled: Boolean;
            modelPath: String;
            minConfidence: Number;
            iouThreshold: Number;
            maxResults: Number;
            skipFrames: Number;
        };
    }
    const config: Config;
    export { config as defaults };
}
declare module "draw/draw" {
    export const drawOptions: {
        color: string;
        labelColor: string;
        shadowColor: string;
        font: string;
        lineHeight: number;
        lineWidth: number;
        pointSize: number;
        roundRect: number;
        drawPoints: Boolean;
        drawLabels: Boolean;
        drawBoxes: Boolean;
        drawPolygons: Boolean;
        fillPolygons: Boolean;
        useDepth: Boolean;
        useCurves: Boolean;
        bufferedOutput: Boolean;
        useRawBoxes: Boolean;
    };
    export function gesture(inCanvas: HTMLCanvasElement, result: Array<any>): Promise<void>;
    export function face(inCanvas: HTMLCanvasElement, result: Array<any>): Promise<void>;
    export function body(inCanvas: HTMLCanvasElement, result: Array<any>): Promise<void>;
    export function hand(inCanvas: HTMLCanvasElement, result: Array<any>): Promise<void>;
    export function object(inCanvas: HTMLCanvasElement, result: Array<any>): Promise<void>;
    export function canvas(inCanvas: HTMLCanvasElement, outCanvas: HTMLCanvasElement): Promise<void>;
    export function all(inCanvas: HTMLCanvasElement, result: any): Promise<void>;
}
declare module "result" {
    /**
     * Result interface definition for **Human** library
     *
     * Contains all possible detection results
     */
    export interface Result {
        /** Face results
         * Combined results of face detector, face mesh, age, gender, emotion, embedding, iris models
         * Some values may be null if specific model is not enabled
         *
         * Array of individual results with one object per detected face
         * Each result has:
         * - overal detection confidence value
         * - box detection confidence value
         * - mesh detection confidence value
         * - box as array of [x, y, width, height], normalized to image resolution
         * - boxRaw as array of [x, y, width, height], normalized to range 0..1
         * - mesh as array of [x, y, z] points of face mesh, normalized to image resolution
         * - meshRaw as array of [x, y, z] points of face mesh, normalized to range 0..1
         * - annotations as array of annotated face mesh points
         * - age as value
         * - gender as value
         * - genderConfidence as value
         * - emotion as array of possible emotions with their individual scores
         * - iris as distance value
         * - angle as object with values for roll, yaw and pitch angles
         */
        face: Array<{
            confidence: Number;
            boxConfidence: Number;
            faceConfidence: Number;
            box: [Number, Number, Number, Number];
            boxRaw: [Number, Number, Number, Number];
            mesh: Array<[Number, Number, Number]>;
            meshRaw: Array<[Number, Number, Number]>;
            annotations: Array<{
                part: String;
                points: Array<[Number, Number, Number]>[];
            }>;
            age: Number;
            gender: String;
            genderConfidence: Number;
            emotion: Array<{
                score: Number;
                emotion: String;
            }>;
            embedding: Array<Number>;
            iris: Number;
            angle: {
                roll: Number;
                yaw: Number;
                pitch: Number;
            };
        }>;
        /** Body results
         *
         * Array of individual results with one object per detected body
         * Each results has:
         * - body id number
         * - body part name
         * - part position with x,y,z coordinates
         * - body part score value
         * - body part presence value
         */
        body: Array<{
            id: Number;
            part: String;
            position: {
                x: Number;
                y: Number;
                z: Number;
            };
            score: Number;
            presence: Number;
        }>;
        /** Hand results
         *
         * Array of individual results with one object per detected hand
         * Each result has:
         * - confidence as value
         * - box as array of [x, y, width, height], normalized to image resolution
         * - boxRaw as array of [x, y, width, height], normalized to range 0..1
         * - landmarks as array of [x, y, z] points of hand, normalized to image resolution
         * - annotations as array of annotated face landmark points
         */
        hand: Array<{
            confidence: Number;
            box: [Number, Number, Number, Number];
            boxRaw: [Number, Number, Number, Number];
            landmarks: Array<[Number, Number, Number]>;
            annotations: Array<{
                part: String;
                points: Array<[Number, Number, Number]>[];
            }>;
        }>;
        /** Gesture results
         *
         * Array of individual results with one object per detected gesture
         * Each result has:
         * - part where gesture was detected
         * - gesture detected
         */
        gesture: Array<{
            part: String;
            gesture: String;
        }>;
        /** Object results
        *
        * Array of individual results with one object per detected gesture
        * Each result has:
        * - score as value
        * - label as detected class name
        * - center as array of [x, y], normalized to image resolution
        * - centerRaw as array of [x, y], normalized to range 0..1
        * - box as array of [x, y, width, height], normalized to image resolution
        * - boxRaw as array of [x, y, width, height], normalized to range 0..1
        */
        object: Array<{
            score: Number;
            strideSize: Number;
            class: Number;
            label: String;
            center: Number[];
            centerRaw: Number[];
            box: Number[];
            boxRaw: Number[];
        }>;
        performance: {
            any: any;
        };
        canvas: OffscreenCanvas | HTMLCanvasElement;
    }
}
declare module "sample" {
    export const face = "\n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";
    export const body = "\n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\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAa2p1UYo5adbz+xbxMlvqJ1OqjDHLXree0ejmzNrWm953tPmTPWbWneZ7yoy5YhjrXXTjH8s75N\nmtkyxt0VZM2/m175N1V03yTKubMLXVXybeYLLX2VXy7eam+b0bOg4VquJW+rry4/O9uyZOq3UjVm\n9r25axMzPaIdvhns1kzbZddM0p5Y47z8/R2+HcF03Doi1a8+Xzvbv+TotJnjDXkt+K8ODHp8cY8N\nIpSO0RCwF2YAAAAAAAAACvUZYw6fJkntWN3k8dfHz2vLucdz8mkjFE9bz1+UOZosX1UzPm0nqI/W\nMYo9FlcPNklfFGeH/NshLGun+Cz6PtHZtVZWlRLS+jxPkRpIn7rdoupHTdA5s6SI+7H6Mfo+32Y2\n+To3neSIiZ7A0IjPXpXLePlMotGW3272t85datKzHZjbTVnsDj+FG/2Y/RlGP4R+jo20u7H6N1Ql\no+H8I/REY957R+jpfReiK6eOYHLtj2tttH6KrY/6Y/R2c+kjeJiFVtLG24hxpw7/AHY/RRkw9O37\nO99Hrt1YX0tfOBLjcGp4XF8c+u8fs9c4dcVcGemSI61nd3IneN1orQAAAAAAAAAAAAABFqxes1tE\nTE9JiUgPKcX4RbRXnNgiZwWnrH4XPi28PdXpW9JraImsxtMS8pxXhF9DecuGJtgmf+1TWW2N/la1\nL7N7T5e3Vy6W3hsYcvLbqzbO9jvvCzvDR0+XeO7crO6FmGSvRThy/RtVXJ92elvk2rRvDUzU7pl4\nizsd2J3jeBpcNz+Lg5LT7+Pp+Xk3W7js5eAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADs0NTrN96Yp6edkW8Wzm6+LNTq4pvTHO9vOfRoWtt\n1mes95YWvs1s2fZldddOczLPLn2ju0MmebT3YZc2/mpm3qqllN1drsbZIhr3yzvtHf4AsvlYYseb\nV5Yx4KTe0+UQ6nDvZ3UazbJqd8OKeu33peq0eh0+hxcmnxxWPOfOfm0mP+steT/ji8N9mKY9suum\nL37+HHaPm9DSlaVitKxWsdohI0Y22gAgAAAAAAAAAABXnyRhw3yT92Nwef4xm8bVzET0rPJH5d12\n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\nAOZE/OsPS29nuH27YrV+VpeV9pdPXhOtw49NG9Mld55+vXcTPd42I47qo7xSfyWV9oM8d8VJ/VxM\nd8l46xWF9cV7en6o/qLfxp2I9ob+eCv/AHMo9op89P8A/wBORGmyT5R+qfo2X8P7n9Q/jTsx7RR5\n6ef+4/8AuHftg/8A6cWcOSO9J/WEbWr3pY7Efzp2Lcfv5YK/9zWy8d1E/ZpSv5Oba1/+Hb9lc+LP\nbFt87I7E/wAabWbiurvEx4nL/pjZzc2bJkn372t85ZXx55/BX85lucC0vPxnTxlnnjm32mOiZqUu\nLJ2p4TwnVavNWaYbRTfre0bQ99pcH0bT0xb78vmtiIiNojaErMwAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAHnfarF7umzRHaZrLjYrdIen9ocPi8JyTt1xzF4eUw23rCm3R4r6bMy\nwt6kdTaWLdjswmNoZontsCm0K5XWjopnuDC0dGpqG5bs08/daKV672MjbSaif6oh6Z5f2LtvptRX\n0tEvUN3Jfo8f7cYve0eX4zV7B5z20xc/C8eSPuZIRficfXlcPaG7ino08HWIbePpLF2NuiyOyrHK\n3fZFSwuovHVfaVF4QK5YWTM9UT0EKry6Ps1Tn4zjn8NZn9nOtLseydObiWW34cf918fWfk+PYANn\nKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq1WKM+ly4p+/WYeBxTNd6zG0xO0\nvobw3FcP0bi2em20Tbmj5Srr418V9sa2Z7qKyzi07MXUylhaU7yjqhLCeiq3ddaFNxFYW7NLNG8t\nzya+WO6Va9J7FW66mvwidnrXiPY3Ny8RyUn71Jj9Ht3RPjk19HK9pMHj8D1ER3rHN+jqqtTjjNps\nuOe16zAifXzfTz7kNyndpYazS9qT0mszDdoxrsi6m8LazMq6zDOsq1ZEyrt1WWlXaUCqyq0rbKbi\nFdp6PReyFd8uqv8ACsfy83aXrPZHHto89/xX2/SP/dpj6y8vx6EBq5gAAAAAAAAAAAAAAAAAAAAA\n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\nNO67NbkhzNVnmInqzaOZrL93JyZeV0M1++7S02jvxDWxhxx033tPpC8Z6rrezWjmZyazJG2/u03h\n2vFibTHoqvamiwVwY+nLGzV0+SZ1Mx8G0/45tOhzJ5lXMc3UVXRdlF1HP+iYsDPLPPy49/tz1+Te\npSIr0ho6ak5Ms5J8o2q6NImOrHV7XX488ypzTtHXo0s9t6zG7c1G1qz6ubeZiZ3UatXJG3yauSO7\ncvMTEx5tPLb3prPRMVr0HB8vicNxf0+7+kt+LOJwTJyY/Bnz3tH93X36N58cWvq6LSyiyndMSlC7\nmZcymLJiwLosmJVRLKLAtiU7q4lMSCzc3YxJuDMRuAlKAEgAAAlAkAAAAAABKAEgAAAAAJAAAAAA\nAAAAAAAEgAAAAAAAAAAAAAkAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAhIAAACAAAASgAAAAAAEAAAA\nhGzJAImGMwzQDDZjNVuyNgUTVhNGxysZqDVmiu1G5NN2M4waM0+DCaN2cbGcQNGaMZq3JxMJxA1J\nqx2bU4kU09slorWNwa20z02RXHbJbl26QvtFovbHWkxEdJt5y2MOHlr2U1W3jx+1hiw8vSO63lmI\nXRTaEWmtY6snRHO1VpmJ+DjavpSZl2s8b7y4HFcnh0n0gha5ebJN55KRM2mdoiPN6fh+kpwXh0Wy\nRHj5Otp/s5Ps1p62y31+em9aTMYt/OfVfxTiPjZ52naI7fBrI5t66xz5+a1rW7yx0eSL6iZjtEOX\nqNbSletom3lENjh2fbHzbbWt3iVozruc+5ztWubf4M4ybpQ2Oboyrva0Vjza8WdDR4OkXt3n9ldX\nkaePP9VtYqctYhdvt5oivTeCZ2YOxXk6ubqMfV0b9mrljfqlFcq88k7z2U5axeItDa1OPessuC8P\nya7XRWYnwqdbT/ZMilvIu4dpslNdixXja8Y5tt85djZdbDWnGOesRtXFtuw6T27No5Kx2OrKYQlC\nExKJgBnEpiyvdlEgsizKLKollFgWxLKJVRLKJBbEp3VxLKJBnuMWQJEbpBIAAAJAAAABIAAAAAAA\nlAJAAAAAAAAAAAAAASAAAAAAAAAAAAAJAAAABAJABAlAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAA\nAAABAJQAAAAgAABAAI2EoBGyJhkgGPKxmqxAKpownHC+YRMdN5BrTj67R3bOn01o7p01Iv71u89o\nb9a7LfBTfS1vWI2jf12VfQPSW8KX2mas+NC2iv6xMNfJpMnLtEbuuxtMRCtzF55NR5rPps1N/ctP\ny6uHreE6nXZ4pak48X3rT06fB7fNeI33cbX6mI32R/MWu7XF116aDSRhxbRERs8f499bkyZeeKae\nkzE2mdon81/tfxDLGOunwbzlzbx08oaHBvZHJlx48mrvaa94pu04y617576rNGLRRM0397JEd/lu\n9Dw/S3x4qxffo6mm4NjwUiKY4iI9Ib1dHFY6QIaNabbrYrLfrpJtaK1rMzPZb/s+05IpP59OyLeJ\nk7eNfRaOc1ue32I7fGXYpi5Y77M8OGMeOKxHSFsU3Y29deZMzirl6dlVvhLatCjJHeYQv1rXnps1\n8k9/VsW6qLVmZIi1rzitlvFKRvaZ2h6TSaenC9FFY+3brM+sqeG8Prp4+kZ+lvuxPkr1mqm95nfp\nDXM459676a2q1dsV7XietvNno78+CJn1cjX6mOeIm0bR33dfRU5NJjidt9t5afjG/V6JZ7I2QMNh\nnyo2BhsMuVG3wAhMSbbQRAMolnE+iuGUSCyJZRKuGUSCyJZK4llEgyZMYTuCUsYSCQASISAAAlCQ\nAAAAAAEoASCASAAAAAAAAAAAAlACRACQAAAAAAAAAEgCEoASCAAAAAAAAAAAAAAAAAAAAAAABAAA\nAAAAAAAISAIAAAAAAQAAACASgAAAQJAQAAhIDHZhln3do7z0WS18mWsajHjmes7pg3dNi5aRMNqO\nyvDHTpPRaigHZhN4hHRlaVN59JY3zRENLUavaO+yq0iNVlitJ6vNcR1MVi0zO0era1/Ea0rPvbz5\nPM5MWp45qvo2GZrhmfrsnpHpHzTCseEcM/2vrr8Q1Eb4qzy44nziPN63HpYiIiI7LNHoqabBTFii\nIpSNohuVxrKtWMEejPwY9G1FFmHB4mWJn7MdfnIM9JpIx15to5pbUaas/a6rqViI7MxPxqX0UT1r\nO3wVzpbR2hviP5i03Y5s6a879FNtHljydhExCv8AMTPJXBnRZbz0iG5ptFjwe/l96zctMVamTJtE\nyTMibu1VrdTzRMR0j0ed4lr64MVpm0RERvMz5NvX62uOJ69XhOKX1HH9bHDtFvNYnfJeOy0Z2ojX\n6jjnEq6fRUmccTvN/J9H0eKcOnx45neaxEbubwHgOHg+milI3vP2resu3Wu0JQmITsmISDHZHKz2\nJgFc1RMLJhGwK9iIZ7MZgEdgmAEwyiWCdwWRLKJVxKYsC2JTuriWUSDNlEsIlMAySx3SCRCQSIAS\nAAACRACQAAAAAAASIASAAAAAAAAAAAAAAACRACRACQASIAAAAAAAAAAAAAAAAAAAAAAAAQCUAAAA\nAAAAAAIAAAAAAAAQAAAAAACBICBICAAEJAQJQCJcLjuS2ny6fPG/LWdpd1o8T0X07SXx/e7wCdJx\nWa0jmneHQpxPDMdZmJfNtZm49weZrh0/j4o7VtSZ2+Uw0/8A7o49k92vBLc/ntFohFW9PqGXimOI\n6Tu1L8T3eCx6r2t1O3JwvHjifO99v7t/Bwf2l1PXU6rS6eJ8qUm8x+so5TsekzcSjbvs4mt4rzW5\nK2mbT0itesy2cHsvbvqtbmyz5xERWP2jd1tJwrTaONsOKtZ8585+cnDrzmn4Rq+IZObUROHD32n7\nVv8A0ej0uhxaXFGPFSK1j0bkY4jyZRVZVXFGUVWbGwKsk8mObekNrSW3pWf1a2aYjHbm7bNnQ1id\nPW0TvuDdhJEbQABMsLW2R0ZTMQrvfbz2YWzVhpanUxEd0dWkW5c8R5uXxDX1w4pnfr5Q19XxKuOJ\n2neXltVqtVxbV/RdJ715+1bypANfiOu1HENV9C0MTfNeesx2rD1PAeBYuE6aKx72W3W9/WVnBuB4\neF4dqRzZbdb5J72l160WVK02ZxCYhOwI23TsnY2BGxsnYBjsiYZsZBjMMZZSgGEolMsQDdG6NwZ7\npiVe6YkFsSziVMWZRILolMSriWUSCyJTuwhMSDMRCQSI3SAlACRCQAAEoAEoASAAAAAAAAACUACR\nACQAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAABAAAAAAAAAAAAACBKAAAAAAAQ\nJQAAAhICEbJAYTWJ7wx8KvpC0BV4ceieWGewDHlNmWwCNjZICNhIDmcZredBecdpiY69FXCOLW+i\nUiZidukulmxxlx2paN4mNng+K4+I8Hy2yaTfl37TXetoCPfRxfp1qi3F48ofKMvtvxak8s6LDv61\nrZji9rPaLUf5PC+bfttS0q8q3p9W/wBrRMdpUZuKdN99nzvFqPbTVz7nD8OKs+do2/mW3h4D7Xaq\nZnPrtNpqz35aRaYOHY9Zk4pNt9rR+rl6zi+OnS+WN57Rv1lXp/YrNaYtruL6zNPnGO3hxP6O5w/2\nf0HDuun09Yv55Le9afznqcOvO4tBreMTHu30unnva0bWt8on+70nDuE4OHYYx4Kbesz3tPrMuhGO\nIjpDOKrK9YVpsyiGUQnYGOyUgI2SlAIEmwMWMs9kTAMJYzDOYRMArmGErZhhMArlHmzmGMwDE3Ts\nbAbs4swj5pgFkSziVcM4BZEsolXDKAZwyhjCYBkACQhIAAAAAAAJAAAAAAAAAAAAAAAAAAAShIAA\nAAAAAAJAAAAAAAAAAAAAABAJEAAAAAAAAAAAAAAAIEoBKAAAAAAAAAAAAAAABAlAAAAAAAIAAAAA\nBAkBAkBAkBAlACEgMZjdjbFW8bWrEx8YWANb6Fp+bfwab+vLDKMFK9qxH5L0bAr8OPRPKz2AY7J2\nSbAjYZAI2E7AIEgIEgIEgMdkSy2NgY7MdlmyNoBXsxmFuyNgVTVjNV3KjlBRNTlXTVHKCrlIqt5T\nlBhEMohlFerLlBjEMohMVTEARDKCITsAk2AEgAAAkAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAD/\n2Q==";
}
declare module "human" {
    import * as tf from '../dist/tfjs.esm.js';
    import * as facemesh from "blazeface/facemesh";
    import * as age from "age/age";
    import * as gender from "gender/gender";
    import * as emotion from "emotion/emotion";
    import * as posenet from "posenet/posenet";
    import * as handpose from "handpose/handpose";
    import * as blazepose from "blazepose/blazepose";
    import * as nanodet from "nanodet/nanodet";
    import * as draw from "draw/draw";
    import { Config } from "config";
    import { Result } from "result";
    type Tensor = {};
    type Model = {};
    export type { Config } from "config";
    export type { Result } from "result";
    /** Defines all possible input types for **Human** detection */
    export type Input = Tensor | ImageData | ImageBitmap | HTMLVideoElement | HTMLCanvasElement | OffscreenCanvas;
    /** Error message */
    export type Error = {
        error: String;
    };
    export type TensorFlow = typeof tf;
    /**
     * **Human** library main class
     *
     * All methods and properties are available only as members of Human class
     *
     * - Configuration object definition: {@link Config}
     * - Results object definition: {@link Result}
     * - Possible inputs: {@link Input}
     */
    export class Human {
        #private;
        version: String;
        config: Config;
        state: String;
        image: {
            tensor: Tensor;
            canvas: OffscreenCanvas | HTMLCanvasElement;
        };
        tf: TensorFlow;
        draw: {
            drawOptions?: typeof draw.drawOptions;
            gesture: typeof draw.gesture;
            face: typeof draw.face;
            body: typeof draw.body;
            hand: typeof draw.hand;
            canvas: typeof draw.canvas;
            all: typeof draw.all;
        };
        models: {
            face: facemesh.MediaPipeFaceMesh | null;
            posenet: posenet.PoseNet | null;
            blazepose: Model | null;
            handpose: handpose.HandPose | null;
            iris: Model | null;
            age: Model | null;
            gender: Model | null;
            emotion: Model | null;
            embedding: Model | null;
            nanodet: Model | null;
        };
        classes: {
            facemesh: typeof facemesh;
            age: typeof age;
            gender: typeof gender;
            emotion: typeof emotion;
            body: typeof posenet | typeof blazepose;
            hand: typeof handpose;
            nanodet: typeof nanodet;
        };
        sysinfo: {
            platform: String;
            agent: String;
        };
        constructor(userConfig?: Config | Object);
        profileData(): {
            newBytes: any;
            newTensors: any;
            peakBytes: any;
            numKernelOps: any;
            timeKernelOps: any;
            slowestKernelOps: any;
            largestKernelOps: any;
        } | {};
        simmilarity(embedding1: Array<Number>, embedding2: Array<Number>): Number;
        enhance(input: Tensor): Tensor | null;
        match(faceEmbedding: Array<Number>, db: Array<{
            name: String;
            source: String | undefined;
            embedding: Array<Number>;
        }>, threshold?: number): {
            name: String;
            source: String | undefined;
            simmilarity: Number;
            embedding: Array<Number>;
        };
        load(userConfig?: Config | Object): Promise<void>;
        detect(input: Input, userConfig?: Config | Object): Promise<Result | Error>;
        warmup(userConfig?: Config | Object): Promise<Result | {
            error: any;
        }>;
    }
    /**
     * Class Human is also available as default export
     */
    export { Human as default };
}
