import { T as reactExports, J as jsxRuntimeExports, a as React, R as React$1 } from "./server-BawtFToo.js";
import { c as createLucideIcon, r as reactDomExports, R as ReactDOM, a as Route, p as projects, L as Link } from "./router-JPgbm6_I.js";
import { i as isEasingArray, V as VisualElement, e as createBox, t as resolveElements, o as mixNumber, s as removeItem, l as isMotionValue, g as defaultOffset, f as createGeneratorEasing, h as fillOffset, j as isGenerator, u as secondsToMilliseconds, r as progress, m as isSVGElement, n as isSVGSVGElement, S as SVGVisualElement, H as HTMLVisualElement, z as visualElementStore, b as animateSingleValue, c as animateTarget, q as motionValue, v as spring, d as cn, N as Nav, p as motion, A as ArrowUpRight } from "./proxy-Ddzyid6m.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function getEasingForSegment(easing, i) {
  return isEasingArray(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
class GroupAnimation {
  constructor(animations2) {
    this.stop = () => this.runAll("stop");
    this.animations = animations2.filter(Boolean);
  }
  get finished() {
    return Promise.all(this.animations.map((animation) => animation.finished));
  }
  /**
   * TODO: Filter out cancelled or stopped animations before returning
   */
  getAll(propName) {
    return this.animations[0][propName];
  }
  setAll(propName, newValue) {
    for (let i = 0; i < this.animations.length; i++) {
      this.animations[i][propName] = newValue;
    }
  }
  attachTimeline(timeline) {
    const subscriptions = this.animations.map((animation) => animation.attachTimeline(timeline));
    return () => {
      subscriptions.forEach((cancel, i) => {
        cancel && cancel();
        this.animations[i].stop();
      });
    };
  }
  get time() {
    return this.getAll("time");
  }
  set time(time) {
    this.setAll("time", time);
  }
  get speed() {
    return this.getAll("speed");
  }
  set speed(speed) {
    this.setAll("speed", speed);
  }
  get state() {
    return this.getAll("state");
  }
  get startTime() {
    return this.getAll("startTime");
  }
  get duration() {
    return getMax(this.animations, "duration");
  }
  get iterationDuration() {
    return getMax(this.animations, "iterationDuration");
  }
  runAll(methodName) {
    this.animations.forEach((controls) => controls[methodName]());
  }
  play() {
    this.runAll("play");
  }
  pause() {
    this.runAll("pause");
  }
  cancel() {
    this.runAll("cancel");
  }
  complete() {
    this.runAll("complete");
  }
}
function getMax(animations2, propName) {
  let max = 0;
  for (let i = 0; i < animations2.length; i++) {
    const value = animations2[i][propName];
    if (value !== null && value > max) {
      max = value;
    }
  }
  return max;
}
class GroupAnimationWithThen extends GroupAnimation {
  then(onResolve, _onReject) {
    return this.finished.finally(onResolve).then(() => {
    });
  }
}
function isObjectKey(key, object) {
  return key in object;
}
class ObjectVisualElement extends VisualElement {
  constructor() {
    super(...arguments);
    this.type = "object";
  }
  readValueFromInstance(instance, key) {
    if (isObjectKey(key, instance)) {
      const value = instance[key];
      if (typeof value === "string" || typeof value === "number") {
        return value;
      }
    }
    return void 0;
  }
  getBaseTargetFromProps() {
    return void 0;
  }
  removeValueFromRenderState(key, renderState) {
    delete renderState.output[key];
  }
  measureInstanceViewportBox() {
    return createBox();
  }
  build(renderState, latestValues) {
    Object.assign(renderState.output, latestValues);
  }
  renderInstance(instance, { output }) {
    Object.assign(instance, output);
  }
  sortInstanceNodePosition() {
    return 0;
  }
}
function isDOMKeyframes(keyframes) {
  return typeof keyframes === "object" && !Array.isArray(keyframes);
}
function resolveSubjects(subject, keyframes, scope, selectorCache) {
  if (subject == null) {
    return [];
  }
  if (typeof subject === "string" && isDOMKeyframes(keyframes)) {
    return resolveElements(subject, scope, selectorCache);
  } else if (subject instanceof NodeList) {
    return Array.from(subject);
  } else if (Array.isArray(subject)) {
    return subject.filter((s) => s != null);
  } else {
    return [subject];
  }
}
function calculateRepeatDuration(duration, repeat, _repeatDelay) {
  return duration * (repeat + 1);
}
function calcNextTime(current, next, prev, labels) {
  if (typeof next === "number") {
    return next;
  } else if (next.startsWith("-") || next.startsWith("+")) {
    return Math.max(0, current + parseFloat(next));
  } else if (next === "<") {
    return prev;
  } else if (next.startsWith("<")) {
    return Math.max(0, prev + parseFloat(next.slice(1)));
  } else {
    return labels.get(next) ?? current;
  }
}
function eraseKeyframes(sequence, startTime, endTime) {
  for (let i = 0; i < sequence.length; i++) {
    const keyframe = sequence[i];
    if (keyframe.at > startTime && keyframe.at < endTime) {
      removeItem(sequence, keyframe);
      i--;
    }
  }
}
function addKeyframes(sequence, keyframes, easing, offset, startTime, endTime) {
  eraseKeyframes(sequence, startTime, endTime);
  for (let i = 0; i < keyframes.length; i++) {
    sequence.push({
      value: keyframes[i],
      at: mixNumber(startTime, endTime, offset[i]),
      easing: getEasingForSegment(easing, i)
    });
  }
}
function normalizeTimes(times, repeat) {
  for (let i = 0; i < times.length; i++) {
    times[i] = times[i] / (repeat + 1);
  }
}
function compareByTime(a, b) {
  if (a.at === b.at) {
    if (a.value === null)
      return 1;
    if (b.value === null)
      return -1;
    return 0;
  } else {
    return a.at - b.at;
  }
}
const defaultSegmentEasing = "easeInOut";
function createAnimationsFromSequence(sequence, { defaultTransition = {}, ...sequenceTransition } = {}, scope, generators) {
  const defaultDuration = defaultTransition.duration || 0.3;
  const animationDefinitions = /* @__PURE__ */ new Map();
  const sequences = /* @__PURE__ */ new Map();
  const elementCache = {};
  const timeLabels = /* @__PURE__ */ new Map();
  let prevTime = 0;
  let currentTime = 0;
  let totalDuration = 0;
  for (let i = 0; i < sequence.length; i++) {
    const segment = sequence[i];
    if (typeof segment === "string") {
      timeLabels.set(segment, currentTime);
      continue;
    } else if (!Array.isArray(segment)) {
      timeLabels.set(segment.name, calcNextTime(currentTime, segment.at, prevTime, timeLabels));
      continue;
    }
    let [subject, keyframes, transition = {}] = segment;
    if (transition.at !== void 0) {
      currentTime = calcNextTime(currentTime, transition.at, prevTime, timeLabels);
    }
    let maxDuration = 0;
    const resolveValueSequence = (valueKeyframes, valueTransition, valueSequence, elementIndex = 0, numSubjects = 0) => {
      const valueKeyframesAsList = keyframesAsList(valueKeyframes);
      const { delay = 0, times = defaultOffset(valueKeyframesAsList), type = defaultTransition.type || "keyframes", repeat, repeatType, repeatDelay = 0, ...remainingTransition } = valueTransition;
      let { ease = defaultTransition.ease || "easeOut", duration } = valueTransition;
      const calculatedDelay = typeof delay === "function" ? delay(elementIndex, numSubjects) : delay;
      const numKeyframes = valueKeyframesAsList.length;
      const createGenerator = isGenerator(type) ? type : generators?.[type || "keyframes"];
      if (numKeyframes <= 2 && createGenerator) {
        let absoluteDelta = 100;
        if (numKeyframes === 2 && isNumberKeyframesArray(valueKeyframesAsList)) {
          const delta = valueKeyframesAsList[1] - valueKeyframesAsList[0];
          absoluteDelta = Math.abs(delta);
        }
        const springTransition = {
          ...defaultTransition,
          ...remainingTransition
        };
        if (duration !== void 0) {
          springTransition.duration = secondsToMilliseconds(duration);
        }
        const springEasing = createGeneratorEasing(springTransition, absoluteDelta, createGenerator);
        ease = springEasing.ease;
        duration = springEasing.duration;
      }
      duration ?? (duration = defaultDuration);
      const startTime = currentTime + calculatedDelay;
      if (times.length === 1 && times[0] === 0) {
        times[1] = 1;
      }
      const remainder = times.length - valueKeyframesAsList.length;
      remainder > 0 && fillOffset(times, remainder);
      valueKeyframesAsList.length === 1 && valueKeyframesAsList.unshift(null);
      if (repeat) {
        duration = calculateRepeatDuration(duration, repeat);
        const originalKeyframes = [...valueKeyframesAsList];
        const originalTimes = [...times];
        ease = Array.isArray(ease) ? [...ease] : [ease];
        const originalEase = [...ease];
        for (let repeatIndex = 0; repeatIndex < repeat; repeatIndex++) {
          valueKeyframesAsList.push(...originalKeyframes);
          for (let keyframeIndex = 0; keyframeIndex < originalKeyframes.length; keyframeIndex++) {
            times.push(originalTimes[keyframeIndex] + (repeatIndex + 1));
            ease.push(keyframeIndex === 0 ? "linear" : getEasingForSegment(originalEase, keyframeIndex - 1));
          }
        }
        normalizeTimes(times, repeat);
      }
      const targetTime = startTime + duration;
      addKeyframes(valueSequence, valueKeyframesAsList, ease, times, startTime, targetTime);
      maxDuration = Math.max(calculatedDelay + duration, maxDuration);
      totalDuration = Math.max(targetTime, totalDuration);
    };
    if (isMotionValue(subject)) {
      const subjectSequence = getSubjectSequence(subject, sequences);
      resolveValueSequence(keyframes, transition, getValueSequence("default", subjectSequence));
    } else {
      const subjects = resolveSubjects(subject, keyframes, scope, elementCache);
      const numSubjects = subjects.length;
      for (let subjectIndex = 0; subjectIndex < numSubjects; subjectIndex++) {
        keyframes = keyframes;
        transition = transition;
        const thisSubject = subjects[subjectIndex];
        const subjectSequence = getSubjectSequence(thisSubject, sequences);
        for (const key in keyframes) {
          resolveValueSequence(keyframes[key], getValueTransition(transition, key), getValueSequence(key, subjectSequence), subjectIndex, numSubjects);
        }
      }
    }
    prevTime = currentTime;
    currentTime += maxDuration;
  }
  sequences.forEach((valueSequences, element) => {
    for (const key in valueSequences) {
      const valueSequence = valueSequences[key];
      valueSequence.sort(compareByTime);
      const keyframes = [];
      const valueOffset = [];
      const valueEasing = [];
      for (let i = 0; i < valueSequence.length; i++) {
        const { at, value, easing } = valueSequence[i];
        keyframes.push(value);
        valueOffset.push(progress(0, totalDuration, at));
        valueEasing.push(easing || "easeOut");
      }
      if (valueOffset[0] !== 0) {
        valueOffset.unshift(0);
        keyframes.unshift(keyframes[0]);
        valueEasing.unshift(defaultSegmentEasing);
      }
      if (valueOffset[valueOffset.length - 1] !== 1) {
        valueOffset.push(1);
        keyframes.push(null);
      }
      if (!animationDefinitions.has(element)) {
        animationDefinitions.set(element, {
          keyframes: {},
          transition: {}
        });
      }
      const definition = animationDefinitions.get(element);
      definition.keyframes[key] = keyframes;
      const { type: _type, ...remainingDefaultTransition } = defaultTransition;
      definition.transition[key] = {
        ...remainingDefaultTransition,
        duration: totalDuration,
        ease: valueEasing,
        times: valueOffset,
        ...sequenceTransition
      };
    }
  });
  return animationDefinitions;
}
function getSubjectSequence(subject, sequences) {
  !sequences.has(subject) && sequences.set(subject, {});
  return sequences.get(subject);
}
function getValueSequence(name, sequences) {
  if (!sequences[name])
    sequences[name] = [];
  return sequences[name];
}
function keyframesAsList(keyframes) {
  return Array.isArray(keyframes) ? keyframes : [keyframes];
}
function getValueTransition(transition, key) {
  return transition && transition[key] ? {
    ...transition,
    ...transition[key]
  } : { ...transition };
}
const isNumber = (keyframe) => typeof keyframe === "number";
const isNumberKeyframesArray = (keyframes) => keyframes.every(isNumber);
function createDOMVisualElement(element) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        transform: {},
        transformOrigin: {},
        style: {},
        vars: {},
        attrs: {}
      },
      latestValues: {}
    }
  };
  const node = isSVGElement(element) && !isSVGSVGElement(element) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
  node.mount(element);
  visualElementStore.set(element, node);
}
function createObjectVisualElement(subject) {
  const options = {
    presenceContext: null,
    props: {},
    visualState: {
      renderState: {
        output: {}
      },
      latestValues: {}
    }
  };
  const node = new ObjectVisualElement(options);
  node.mount(subject);
  visualElementStore.set(subject, node);
}
function isSingleValue(subject, keyframes) {
  return isMotionValue(subject) || typeof subject === "number" || typeof subject === "string" && !isDOMKeyframes(keyframes);
}
function animateSubject(subject, keyframes, options, scope) {
  const animations2 = [];
  if (isSingleValue(subject, keyframes)) {
    animations2.push(animateSingleValue(subject, isDOMKeyframes(keyframes) ? keyframes.default || keyframes : keyframes, options ? options.default || options : options));
  } else {
    if (subject == null) {
      return animations2;
    }
    const subjects = resolveSubjects(subject, keyframes, scope);
    const numSubjects = subjects.length;
    for (let i = 0; i < numSubjects; i++) {
      const thisSubject = subjects[i];
      const createVisualElement = thisSubject instanceof Element ? createDOMVisualElement : createObjectVisualElement;
      if (!visualElementStore.has(thisSubject)) {
        createVisualElement(thisSubject);
      }
      const visualElement = visualElementStore.get(thisSubject);
      const transition = { ...options };
      if ("delay" in transition && typeof transition.delay === "function") {
        transition.delay = transition.delay(i, numSubjects);
      }
      animations2.push(...animateTarget(visualElement, { ...keyframes, transition }, {}));
    }
  }
  return animations2;
}
function animateSequence(sequence, options, scope) {
  const animations2 = [];
  const processedSequence = sequence.map((segment) => {
    if (Array.isArray(segment) && typeof segment[0] === "function") {
      const callback = segment[0];
      const mv = motionValue(0);
      mv.on("change", callback);
      if (segment.length === 1) {
        return [mv, [0, 1]];
      } else if (segment.length === 2) {
        return [mv, [0, 1], segment[1]];
      } else {
        return [mv, segment[1], segment[2]];
      }
    }
    return segment;
  });
  const animationDefinitions = createAnimationsFromSequence(processedSequence, options, scope, { spring });
  animationDefinitions.forEach(({ keyframes, transition }, subject) => {
    animations2.push(...animateSubject(subject, keyframes, transition));
  });
  return animations2;
}
function isSequence(value) {
  return Array.isArray(value) && value.some(Array.isArray);
}
function createScopedAnimate(options = {}) {
  const { scope, reduceMotion } = options;
  function scopedAnimate(subjectOrSequence, optionsOrKeyframes, options2) {
    let animations2 = [];
    let animationOnComplete;
    if (isSequence(subjectOrSequence)) {
      const { onComplete, ...sequenceOptions } = optionsOrKeyframes || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations2 = animateSequence(subjectOrSequence, reduceMotion !== void 0 ? { reduceMotion, ...sequenceOptions } : sequenceOptions, scope);
    } else {
      const { onComplete, ...rest } = options2 || {};
      if (typeof onComplete === "function") {
        animationOnComplete = onComplete;
      }
      animations2 = animateSubject(subjectOrSequence, optionsOrKeyframes, reduceMotion !== void 0 ? { reduceMotion, ...rest } : rest, scope);
    }
    const animation = new GroupAnimationWithThen(animations2);
    if (animationOnComplete) {
      animation.finished.then(animationOnComplete);
    }
    if (scope) {
      scope.animations.push(animation);
      animation.finished.then(() => {
        removeItem(scope.animations, animation);
      });
    }
    return animation;
  }
  return scopedAnimate;
}
const animate$1 = createScopedAnimate();
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
function createContext2(rootComponentName, defaultContext) {
  const Context2 = reactExports.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = reactExports.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Context2.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext2(consumerName) {
    const context = reactExports.useContext(Context2);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context2 = scope?.[scopeName]?.[index] || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context2.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context2 = scope?.[scopeName]?.[index] || BaseContext;
      const context = reactExports.useContext(Context2);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var useLayoutEffect2 = globalThis?.document ? reactExports.useLayoutEffect : () => {
};
var useReactId = React[" useId ".trim().toString()] || (() => void 0);
var count$1 = 0;
function useId(deterministicId) {
  const [id, setId] = reactExports.useState(useReactId());
  useLayoutEffect2(() => {
    setId((reactId) => reactId ?? String(count$1++));
  }, [deterministicId]);
  return deterministicId || (id ? `radix-${id}` : "");
}
var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = reactExports.useRef(prop !== void 0);
    reactExports.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = reactExports.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = reactExports.useState(defaultProp);
  const prevValueRef = reactExports.useRef(value);
  const onChangeRef = reactExports.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  reactExports.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}
// @__NO_SIDE_EFFECTS__
function createSlot$1(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone$1(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable$1);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone$1(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef$2(children);
      const props2 = mergeProps$1(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER$1 = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable$1(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER$1;
}
function mergeProps$1(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = /* @__PURE__ */ createSlot$1(`Primitive.${node}`);
  const Node2 = reactExports.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[/* @__PURE__ */ Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node2 };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) reactDomExports.flushSync(() => target.dispatchEvent(event));
}
function useCallbackRef$1(callback) {
  const callbackRef = reactExports.useRef(callback);
  reactExports.useEffect(() => {
    callbackRef.current = callback;
  });
  return reactExports.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
  reactExports.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}
var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = reactExports.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = reactExports.useContext(DismissableLayerContext);
    const [node, setNode] = reactExports.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = reactExports.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    reactExports.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    reactExports.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    reactExports.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = reactExports.forwardRef((props, forwardedRef) => {
  const context = reactExports.useContext(DismissableLayerContext);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
  const isPointerInsideReactTreeRef = reactExports.useRef(false);
  const handleClickRef = reactExports.useRef(() => {
  });
  reactExports.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef$1(onFocusOutside);
  const isFocusInsideReactTreeRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = reactExports.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = reactExports.useState(null);
  const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
  const lastFocusedElementRef = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
  const focusScope = reactExports.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  reactExports.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container) return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container) return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null) return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) focus(container);
        }
      };
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container) mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  reactExports.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      }
    },
    [loop, trapped, focusScope.paused]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}
var PORTAL_NAME$1 = "Portal";
var Portal$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = reactExports.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal$1.displayName = PORTAL_NAME$1;
function useStateMachine(initialState2, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState2);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef$1(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState2 = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState2, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles2 = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles2);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles2?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles2) {
  return styles2?.animationName || "none";
}
function getElementRef$1(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var count = 0;
function useFocusGuards() {
  reactExports.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}
var __assign$1 = function() {
  __assign$1 = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign$1.apply(this, arguments);
};
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __spreadArray$1(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
function assignRef$1(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}
function useCallbackRef(initialValue, callback) {
  var ref = reactExports.useState(function() {
    return {
      // value
      value: initialValue,
      // last callback
      callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        }
      }
    };
  })[0];
  ref.callback = callback;
  return ref.facade;
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
function useMergeRefs(refs, defaultValue) {
  var callbackRef = useCallbackRef(null, function(newValue) {
    return refs.forEach(function(ref) {
      return assignRef$1(ref, newValue);
    });
  });
  useIsomorphicLayoutEffect(function() {
    var oldValue = currentValues.get(callbackRef);
    if (oldValue) {
      var prevRefs_1 = new Set(oldValue);
      var nextRefs_1 = new Set(refs);
      var current_1 = callbackRef.current;
      prevRefs_1.forEach(function(ref) {
        if (!nextRefs_1.has(ref)) {
          assignRef$1(ref, null);
        }
      });
      nextRefs_1.forEach(function(ref) {
        if (!prevRefs_1.has(ref)) {
          assignRef$1(ref, current_1);
        }
      });
    }
    currentValues.set(callbackRef, refs);
  }, [refs]);
  return callbackRef;
}
function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function() {
      if (assigned) {
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function(data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function() {
        buffer = buffer.filter(function(x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function(cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function(x) {
          return cb(x);
        },
        filter: function() {
          return buffer;
        }
      };
    },
    assignMedium: function(cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function() {
        var cbs2 = pendingQueue;
        pendingQueue = [];
        cbs2.forEach(cb);
      };
      var cycle = function() {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function(x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function(filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        }
      };
    }
  };
  return medium;
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign$1({ async: true, ssr: false }, options);
  return medium;
}
var SideCar$1 = function(_a) {
  var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return reactExports.createElement(Target, __assign$1({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}
var effectCar = createSidecarMedium();
var nothing = function() {
  return;
};
var RemoveScroll = reactExports.forwardRef(function(props, parentRef) {
  var ref = reactExports.useRef(null);
  var _a = reactExports.useState({
    onScrollCapture: nothing,
    onWheelCapture: nothing,
    onTouchMoveCapture: nothing
  }), callbacks = _a[0], setCallbacks = _a[1];
  var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
  var SideCar2 = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign$1(__assign$1({}, rest), callbacks);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    enabled && reactExports.createElement(SideCar2, { sideCar: effectCar, removeScrollBar, shards, noRelative, noIsolation, inert, setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode }),
    forwardProps ? reactExports.cloneElement(reactExports.Children.only(children), __assign$1(__assign$1({}, containerProps), { ref: containerRef })) : reactExports.createElement(Container, __assign$1({}, containerProps, { className, ref: containerRef }), children)
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName
};
var getNonce = function() {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return void 0;
};
function makeStyleTag() {
  if (!document)
    return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function() {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function(style) {
      if (counter == 0) {
        if (stylesheet = makeStyleTag()) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function() {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    }
  };
};
var styleHookSingleton = function() {
  var sheet = stylesheetSingleton();
  return function(styles2, isDynamic) {
    reactExports.useEffect(function() {
      sheet.add(styles2);
      return function() {
        sheet.remove();
      };
    }, [styles2 && isDynamic]);
  };
};
var styleSingleton = function() {
  var useStyle = styleHookSingleton();
  var Sheet = function(_a) {
    var styles2 = _a.styles, dynamic = _a.dynamic;
    useStyle(styles2, dynamic);
    return null;
  };
  return Sheet;
};
var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
};
var parse = function(x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset$1 = function(gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function(gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset$1(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
  };
};
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
  var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
    allowRelative && "position: relative ".concat(important, ";"),
    gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
    gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
  ].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
  var counter = parseInt(document.body.getAttribute(lockAttribute) || "0", 10);
  return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
  reactExports.useEffect(function() {
    document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
    return function() {
      var newCounter = getCurrentUseCounter() - 1;
      if (newCounter <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, newCounter.toString());
      }
    };
  }, []);
};
var RemoveScrollBar = function(_a) {
  var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
  useLockAttribute();
  var gap = reactExports.useMemo(function() {
    return getGapWidth(gapMode);
  }, [gapMode]);
  return reactExports.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
var passiveSupported$1 = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function() {
        passiveSupported$1 = true;
        return true;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported$1 = false;
  }
}
var nonPassive = passiveSupported$1 ? { passive: false } : false;
var alwaysContainsScroll = function(node) {
  return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
  if (!(node instanceof Element)) {
    return false;
  }
  var styles2 = window.getComputedStyle(node);
  return (
    // not-not-scrollable
    styles2[overflow] !== "hidden" && // contains scroll inside self
    !(styles2.overflowY === styles2.overflowX && !alwaysContainsScroll(node) && styles2[overflow] === "visible")
  );
};
var elementCouldBeVScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
  return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
  var ownerDocument = node.ownerDocument;
  var current = node;
  do {
    if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) {
      current = current.host;
    }
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
      if (scrollHeight > clientHeight) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== ownerDocument.body);
  return false;
};
var getVScrollVariables = function(_a) {
  var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
  return [
    scrollTop,
    scrollHeight,
    clientHeight
  ];
};
var getHScrollVariables = function(_a) {
  var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
  return [
    scrollLeft,
    scrollWidth,
    clientWidth
  ];
};
var elementCouldBeScrolled = function(axis, node) {
  return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
  return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
  var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
  var delta = directionFactor * sourceDelta;
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    if (!target) {
      break;
    }
    var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
    var elementScroll = scroll_1 - capacity - directionFactor * position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    var parent_1 = target.parentNode;
    target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
  } while (
    // portaled content
    !targetInLock && target !== document.body || // self content
    targetInLock && (endTarget.contains(target) || endTarget === target)
  );
  if (isDeltaPositive && (Math.abs(availableScroll) < 1 || false)) {
    shouldCancelScroll = true;
  } else if (!isDeltaPositive && (Math.abs(availableScrollTop) < 1 || false)) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};
var getTouchXY = function(event) {
  return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
  return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = reactExports.useRef([]);
  var touchStartRef = reactExports.useRef([0, 0]);
  var activeAxis = reactExports.useRef();
  var id = reactExports.useState(idCounter++)[0];
  var Style2 = reactExports.useState(styleSingleton)[0];
  var lastProps = reactExports.useRef(props);
  reactExports.useEffect(function() {
    lastProps.current = props;
  }, [props]);
  reactExports.useEffect(function() {
    if (props.inert) {
      document.body.classList.add("block-interactivity-".concat(id));
      var allow_1 = __spreadArray$1([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
      allow_1.forEach(function(el) {
        return el.classList.add("allow-interactivity-".concat(id));
      });
      return function() {
        document.body.classList.remove("block-interactivity-".concat(id));
        allow_1.forEach(function(el) {
          return el.classList.remove("allow-interactivity-".concat(id));
        });
      };
    }
    return;
  }, [props.inert, props.lockRef.current, props.shards]);
  var shouldCancelEvent = reactExports.useCallback(function(event, parent) {
    if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    if ("touches" in event && moveDirection === "h" && target.type === "range") {
      return false;
    }
    var selection = window.getSelection();
    var anchorNode = selection && selection.anchorNode;
    var isTouchingSelection = anchorNode ? anchorNode === target || anchorNode.contains(target) : false;
    if (isTouchingSelection) {
      return false;
    }
    var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY);
  }, []);
  var shouldPrevent = reactExports.useCallback(function(_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style2) {
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function(e) {
      return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
    })[0];
    if (sourceEvent && sourceEvent.should) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
        return node.contains(event.target);
      });
      var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
      if (shouldStop) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }, []);
  var shouldCancel = reactExports.useCallback(function(name, delta, target, should) {
    var event = { name, delta, target, should, shadowParent: getOutermostShadowParent(target) };
    shouldPreventQueue.current.push(event);
    setTimeout(function() {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = reactExports.useCallback(function(event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = void 0;
  }, []);
  var scrollWheel = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  var scrollTouchMove = reactExports.useCallback(function(event) {
    shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
  }, []);
  reactExports.useEffect(function() {
    lockStack.push(Style2);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function() {
      lockStack = lockStack.filter(function(inst) {
        return inst !== Style2;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar, inert = props.inert;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    inert ? reactExports.createElement(Style2, { styles: generateStyle(id) }) : null,
    removeScrollBar ? reactExports.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null
  );
}
function getOutermostShadowParent(node) {
  var shadowParent = null;
  while (node !== null) {
    if (node instanceof ShadowRoot) {
      shadowParent = node.host;
      node = node.host;
    }
    node = node.parentNode;
  }
  return shadowParent;
}
const SideCar = exportSidecar(effectCar, RemoveScrollSideCar);
var ReactRemoveScroll = reactExports.forwardRef(function(props, ref) {
  return reactExports.createElement(RemoveScroll, __assign$1({}, props, { ref, sideCar: SideCar }));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
var getDefaultParent = function(originalTarget) {
  if (typeof document === "undefined") {
    return null;
  }
  var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
  return sampleTarget.ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
  return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
  return targets.map(function(target) {
    if (parent.contains(target)) {
      return target;
    }
    var correctedTarget = unwrapHost(target);
    if (correctedTarget && parent.contains(correctedTarget)) {
      return correctedTarget;
    }
    console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
    return null;
  }).filter(function(x) {
    return Boolean(x);
  });
};
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
  var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  var markerCounter = markerMap[markerName];
  var hiddenNodes = [];
  var elementsToKeep = /* @__PURE__ */ new Set();
  var elementsToStop = new Set(targets);
  var keep = function(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    keep(el.parentNode);
  };
  targets.forEach(keep);
  var deep = function(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    Array.prototype.forEach.call(parent.children, function(node) {
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        try {
          var attr = node.getAttribute(controlAttribute);
          var alreadyHidden = attr !== null && attr !== "false";
          var counterValue = (counterMap.get(node) || 0) + 1;
          var markerValue = (markerCounter.get(node) || 0) + 1;
          counterMap.set(node, counterValue);
          markerCounter.set(node, markerValue);
          hiddenNodes.push(node);
          if (counterValue === 1 && alreadyHidden) {
            uncontrolledNodes.set(node, true);
          }
          if (markerValue === 1) {
            node.setAttribute(markerName, "true");
          }
          if (!alreadyHidden) {
            node.setAttribute(controlAttribute, "true");
          }
        } catch (e) {
          console.error("aria-hidden: cannot operate on ", node, e);
        }
      }
    });
  };
  deep(parentNode);
  elementsToKeep.clear();
  lockCount++;
  return function() {
    hiddenNodes.forEach(function(node) {
      var counterValue = counterMap.get(node) - 1;
      var markerValue = markerCounter.get(node) - 1;
      counterMap.set(node, counterValue);
      markerCounter.set(node, markerValue);
      if (!counterValue) {
        if (!uncontrolledNodes.has(node)) {
          node.removeAttribute(controlAttribute);
        }
        uncontrolledNodes.delete(node);
      }
      if (!markerValue) {
        node.removeAttribute(markerName);
      }
    });
    lockCount--;
    if (!lockCount) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledNodes = /* @__PURE__ */ new WeakMap();
      markerMap = {};
    }
  };
};
var hideOthers = function(originalTarget, parentNode, markerName) {
  if (markerName === void 0) {
    markerName = "data-aria-hidden";
  }
  var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
  var activeParentNode = getDefaultParent(originalTarget);
  if (!activeParentNode) {
    return function() {
      return null;
    };
  }
  targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
  return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = reactExports.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (reactExports.Children.count(newElement) > 1) return reactExports.Children.only(null);
          return reactExports.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: reactExports.isValidElement(newElement) ? reactExports.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = reactExports.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (reactExports.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== reactExports.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return reactExports.cloneElement(children, props2);
    }
    return reactExports.Children.count(children) > 1 ? reactExports.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = /* @__PURE__ */ Symbol("radix.slottable");
function isSlottable(child) {
  return reactExports.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState$1(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay.displayName = OVERLAY_NAME;
var Slot = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState$1(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState$1(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState$1(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog;
var Trigger = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content = DialogContent;
var Title = DialogTitle;
var Close = DialogClose;
var roundNumber = function(num, decimal) {
  return Number(num.toFixed(decimal));
};
var checkIsNumber = function(num, defaultValue) {
  return typeof num === "number" ? num : defaultValue;
};
var handleCallback = function(context, event, callback) {
  if (callback && typeof callback === "function") {
    callback(context, event);
  }
};
var easeOut = function(t) {
  return -Math.cos(t * Math.PI) / 2 + 0.5;
};
var linear = function(t) {
  return t;
};
var easeInQuad = function(t) {
  return t * t;
};
var easeOutQuad = function(t) {
  return t * (2 - t);
};
var easeInOutQuad = function(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
var easeInCubic = function(t) {
  return t * t * t;
};
var easeOutCubic = function(t) {
  return --t * t * t + 1;
};
var easeInOutCubic = function(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
var easeInQuart = function(t) {
  return t * t * t * t;
};
var easeOutQuart = function(t) {
  return 1 - --t * t * t * t;
};
var easeInOutQuart = function(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
};
var easeInQuint = function(t) {
  return t * t * t * t * t;
};
var easeOutQuint = function(t) {
  return 1 + --t * t * t * t * t;
};
var easeInOutQuint = function(t) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
};
var animations = {
  easeOut,
  linear,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint
};
var handleCancelAnimationFrame = function(animation) {
  if (typeof animation === "number") {
    cancelAnimationFrame(animation);
  }
};
var handleCancelAnimation = function(contextInstance) {
  if (!contextInstance.mounted)
    return;
  handleCancelAnimationFrame(contextInstance.animation);
  contextInstance.isAnimating = false;
  contextInstance.animation = null;
  contextInstance.velocity = null;
};
function handleSetupAnimation(contextInstance, animationName, animationTime, callback) {
  if (!contextInstance.mounted)
    return;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  var lastStep = 1;
  handleCancelAnimation(contextInstance);
  contextInstance.animation = function() {
    if (!contextInstance.mounted) {
      return handleCancelAnimationFrame(contextInstance.animation);
    }
    var frameTime = (/* @__PURE__ */ new Date()).getTime() - startTime;
    var animationProgress = frameTime / animationTime;
    var animationType = animations[animationName];
    var step = animationType(animationProgress);
    if (frameTime >= animationTime) {
      callback(lastStep);
      contextInstance.animation = null;
    } else if (contextInstance.animation) {
      callback(step);
      requestAnimationFrame(contextInstance.animation);
    }
  };
  requestAnimationFrame(contextInstance.animation);
}
function isValidTargetState(targetState) {
  var scale = targetState.scale, positionX = targetState.positionX, positionY = targetState.positionY;
  if (Number.isNaN(scale) || Number.isNaN(positionX) || Number.isNaN(positionY)) {
    return false;
  }
  return true;
}
function animate(contextInstance, targetState, animationTime, animationName) {
  var isValid = isValidTargetState(targetState);
  if (!contextInstance.mounted || !isValid)
    return;
  var setState = contextInstance.setState;
  var _a = contextInstance.state, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  var scaleDiff = targetState.scale - scale;
  var positionXDiff = targetState.positionX - positionX;
  var positionYDiff = targetState.positionY - positionY;
  if (animationTime === 0) {
    setState(targetState.scale, targetState.positionX, targetState.positionY);
  } else {
    handleSetupAnimation(contextInstance, animationName, animationTime, function(step) {
      if (step !== 1) {
        contextInstance.isAnimating = true;
      } else {
        contextInstance.isAnimating = false;
      }
      var newScale = scale + scaleDiff * step;
      var newPositionX = positionX + positionXDiff * step;
      var newPositionY = positionY + positionYDiff * step;
      setState(newScale, newPositionX, newPositionY);
    });
  }
}
function getComponentsSizes(wrapperComponent, contentComponent, newScale) {
  var wrapperWidth = wrapperComponent.offsetWidth;
  var wrapperHeight = wrapperComponent.offsetHeight;
  var contentWidth = contentComponent.offsetWidth;
  var contentHeight = contentComponent.offsetHeight;
  var newContentWidth = contentWidth * newScale;
  var newContentHeight = contentHeight * newScale;
  var newDiffWidth = wrapperWidth - newContentWidth;
  var newDiffHeight = wrapperHeight - newContentHeight;
  return {
    wrapperWidth,
    wrapperHeight,
    newContentWidth,
    newDiffWidth,
    newContentHeight,
    newDiffHeight
  };
}
var getBounds = function(wrapperWidth, newContentWidth, diffWidth, wrapperHeight, newContentHeight, diffHeight, centerZoomedOut) {
  var scaleWidthFactor = wrapperWidth > newContentWidth ? diffWidth * (centerZoomedOut ? 0.5 : 1) : 0;
  var scaleHeightFactor = wrapperHeight > newContentHeight ? diffHeight * (centerZoomedOut ? 0.5 : 1) : 0;
  var minPositionX = wrapperWidth - newContentWidth - scaleWidthFactor;
  var maxPositionX = scaleWidthFactor;
  var minPositionY = wrapperHeight - newContentHeight - scaleHeightFactor;
  var maxPositionY = scaleHeightFactor;
  return {
    minPositionX,
    maxPositionX,
    minPositionY,
    maxPositionY,
    scaleWidthFactor,
    scaleHeightFactor
  };
};
var calculateBounds = function(contextInstance, newScale) {
  var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
  var _a = contextInstance.setup, centerZoomedOut = _a.centerZoomedOut, disablePadding = _a.disablePadding;
  if (!wrapperComponent || !contentComponent) {
    throw new Error("Components are not mounted");
  }
  var _b = getComponentsSizes(wrapperComponent, contentComponent, newScale), wrapperWidth = _b.wrapperWidth, wrapperHeight = _b.wrapperHeight, newContentWidth = _b.newContentWidth, newContentHeight = _b.newContentHeight, newDiffWidth = _b.newDiffWidth, newDiffHeight = _b.newDiffHeight;
  var bounds = getBounds(wrapperWidth, newContentWidth, newDiffWidth, wrapperHeight, newContentHeight, newDiffHeight, Boolean(centerZoomedOut));
  var contentFitsCompletely = wrapperWidth >= newContentWidth && wrapperHeight >= newContentHeight;
  if (disablePadding && contentFitsCompletely && !centerZoomedOut) {
    bounds.minPositionX = 0;
    bounds.maxPositionX = 0;
    bounds.minPositionY = 0;
    bounds.maxPositionY = 0;
  }
  var _c = contextInstance.setup, propMinX = _c.minPositionX, propMaxX = _c.maxPositionX, propMinY = _c.minPositionY, propMaxY = _c.maxPositionY;
  if (propMinX != null) {
    bounds.minPositionX = wrapperWidth * (1 - newScale) + propMinX * newScale;
  }
  if (propMaxX != null) {
    bounds.maxPositionX = propMaxX * newScale;
  }
  if (propMinY != null) {
    bounds.minPositionY = wrapperHeight * (1 - newScale) + propMinY * newScale;
  }
  if (propMaxY != null) {
    bounds.maxPositionY = propMaxY * newScale;
  }
  return bounds;
};
var boundLimiter = function(value, minBound, maxBound, isActive) {
  if (!isActive)
    return roundNumber(value, 2);
  if (value < minBound)
    return roundNumber(minBound, 2);
  if (value > maxBound)
    return roundNumber(maxBound, 2);
  return roundNumber(value, 2);
};
var handleCalculateBounds = function(contextInstance, newScale) {
  var bounds = calculateBounds(contextInstance, newScale);
  contextInstance.bounds = bounds;
  return bounds;
};
function getMouseBoundedPosition(positionX, positionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent) {
  var minPositionX = bounds.minPositionX, minPositionY = bounds.minPositionY, maxPositionX = bounds.maxPositionX, maxPositionY = bounds.maxPositionY;
  var paddingX = 0;
  var paddingY = 0;
  if (wrapperComponent) {
    paddingX = paddingValueX;
    paddingY = paddingValueY;
  }
  var x = boundLimiter(positionX, minPositionX - paddingX, maxPositionX + paddingX, limitToBounds);
  var y = boundLimiter(positionY, minPositionY - paddingY, maxPositionY + paddingY, limitToBounds);
  return { x, y };
}
function handleCalculateZoomPositions(contextInstance, mouseX, mouseY, newScale, bounds, limitToBounds) {
  var _a = contextInstance.state, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  var scaleDifference = newScale - scale;
  if (typeof mouseX !== "number" || typeof mouseY !== "number") {
    console.error("Mouse X and Y position were not provided!");
    return { x: positionX, y: positionY };
  }
  var calculatedPositionX = positionX - mouseX * scaleDifference;
  var calculatedPositionY = positionY - mouseY * scaleDifference;
  var newPositions = getMouseBoundedPosition(calculatedPositionX, calculatedPositionY, bounds, limitToBounds, 0, 0, null);
  return newPositions;
}
var MIN_SAFE_SCALE = 1e-7;
function checkZoomBounds(zoom, minScale, maxScale, zoomPadding, enablePadding) {
  var scalePadding = enablePadding ? zoomPadding : 0;
  var minScaleWithPadding = Math.max(minScale - scalePadding, MIN_SAFE_SCALE);
  var maxScaleWithPadding = maxScale + scalePadding;
  if (!Number.isNaN(maxScale) && zoom >= maxScaleWithPadding)
    return maxScaleWithPadding;
  if (!Number.isNaN(minScale) && zoom <= minScaleWithPadding)
    return minScaleWithPadding;
  return Math.max(zoom, MIN_SAFE_SCALE);
}
var isPanningStartAllowed = function(contextInstance, event) {
  var excluded = contextInstance.setup.panning.excluded;
  var isInitialized = contextInstance.isInitialized, wrapperComponent = contextInstance.wrapperComponent;
  var target = event.target;
  var targetIsShadowDom = "shadowRoot" in target && "composedPath" in event;
  var isWrapperChild = targetIsShadowDom ? event.composedPath().some(function(el) {
    if (!(el instanceof Element)) {
      return false;
    }
    return wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(el);
  }) : wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(target);
  var isAllowed = isInitialized && target && isWrapperChild;
  if (!isAllowed)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  if (target.getAttribute("draggable") === "true" || target.getAttribute("contenteditable") === "true" || target.isContentEditable) {
    return false;
  }
  return true;
};
var isPanningAllowed = function(contextInstance) {
  var isInitialized = contextInstance.isInitialized, isPanning = contextInstance.isPanning, setup = contextInstance.setup;
  var disabled = setup.panning.disabled;
  var isAllowed = isInitialized && isPanning && !disabled;
  if (!isAllowed)
    return false;
  return true;
};
var handlePanningSetup = function(contextInstance, event) {
  var _a = contextInstance.state, positionX = _a.positionX, positionY = _a.positionY;
  contextInstance.isPanning = true;
  var x = event.clientX;
  var y = event.clientY;
  contextInstance.startCoords = { x: x - positionX, y: y - positionY };
};
var handleTouchPanningSetup = function(contextInstance, event) {
  var touches = event.touches;
  var _a = contextInstance.state, positionX = _a.positionX, positionY = _a.positionY;
  contextInstance.isPanning = true;
  var oneFingerTouch = touches.length === 1;
  if (oneFingerTouch) {
    var x = touches[0].clientX;
    var y = touches[0].clientY;
    contextInstance.startCoords = { x: x - positionX, y: y - positionY };
  }
};
function handlePanToBounds(contextInstance) {
  var _a = contextInstance.state, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
  var _b = contextInstance.setup, disabled = _b.disabled, limitToBounds = _b.limitToBounds, centerZoomedOut = _b.centerZoomedOut;
  var wrapperComponent = contextInstance.wrapperComponent;
  if (disabled || !wrapperComponent || !contextInstance.bounds)
    return;
  var _c = contextInstance.bounds, maxPositionX = _c.maxPositionX, minPositionX = _c.minPositionX, maxPositionY = _c.maxPositionY, minPositionY = _c.minPositionY;
  var xChanged = positionX > maxPositionX || positionX < minPositionX;
  var yChanged = positionY > maxPositionY || positionY < minPositionY;
  var mousePosX = positionX > maxPositionX ? wrapperComponent.offsetWidth : contextInstance.setup.minPositionX || 0;
  var mousePosY = positionY > maxPositionY ? wrapperComponent.offsetHeight : contextInstance.setup.minPositionY || 0;
  var _d = handleCalculateZoomPositions(contextInstance, mousePosX, mousePosY, scale, contextInstance.bounds, limitToBounds || centerZoomedOut), x = _d.x, y = _d.y;
  return {
    scale,
    positionX: xChanged ? x : positionX,
    positionY: yChanged ? y : positionY
  };
}
function handleNewPosition(contextInstance, newPositionX, newPositionY, paddingValueX, paddingValueY) {
  var limitToBounds = contextInstance.setup.limitToBounds;
  var wrapperComponent = contextInstance.wrapperComponent, bounds = contextInstance.bounds;
  var _a = contextInstance.state, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  if (wrapperComponent === null || bounds === null || newPositionX === positionX && newPositionY === positionY) {
    return;
  }
  var _b = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent), x = _b.x, y = _b.y;
  contextInstance.setState(scale, x, y);
}
var getPanningClientPosition = function(contextInstance, clientX, clientY) {
  var startCoords = contextInstance.startCoords, state = contextInstance.state;
  var panning = contextInstance.setup.panning;
  var lockAxisX = panning.lockAxisX, lockAxisY = panning.lockAxisY;
  var positionX = state.positionX, positionY = state.positionY;
  if (!startCoords) {
    return { x: positionX, y: positionY };
  }
  var mouseX = clientX - startCoords.x;
  var mouseY = clientY - startCoords.y;
  var newPositionX = lockAxisX ? positionX : mouseX;
  var newPositionY = lockAxisY ? positionY : mouseY;
  return { x: newPositionX, y: newPositionY };
};
var getPaddingValue = function(contextInstance, size, explicitScale) {
  var setup = contextInstance.setup, state = contextInstance.state;
  var minScale = setup.minScale, disablePadding = setup.disablePadding, centerZoomedOut = setup.centerZoomedOut;
  var scale = explicitScale !== null && explicitScale !== void 0 ? explicitScale : state.scale;
  if (size > 0 && scale >= minScale && !disablePadding && !centerZoomedOut) {
    return size;
  }
  return 0;
};
var DeviceType;
(function(DeviceType2) {
  DeviceType2["TRACK_PAD"] = "track_pad";
  DeviceType2["MOUSE"] = "mouse";
  DeviceType2["TOUCH"] = "touch";
})(DeviceType || (DeviceType = {}));
var isVelocityCalculationAllowed = function(contextInstance) {
  var mounted = contextInstance.mounted, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
  var _a = contextInstance.setup, disabled = _a.disabled, velocityAnimation = _a.velocityAnimation, limitToBounds = _a.limitToBounds;
  var scale = contextInstance.state.scale;
  var disabledVelocity = velocityAnimation.disabled;
  if (disabledVelocity || disabled || !mounted)
    return false;
  if (!wrapperComponent || !contentComponent)
    return false;
  if (!limitToBounds)
    return true;
  var contentOverflows = wrapperComponent.offsetWidth < contentComponent.offsetWidth * scale || wrapperComponent.offsetHeight < contentComponent.offsetHeight * scale;
  return contentOverflows;
};
var isVelocityAllowed = function(contextInstance) {
  var mounted = contextInstance.mounted, velocity = contextInstance.velocity, bounds = contextInstance.bounds;
  var _a = contextInstance.setup, disabled = _a.disabled, velocityAnimation = _a.velocityAnimation;
  var disabledVelocity = velocityAnimation.disabled;
  var isAllowed = !disabledVelocity && !disabled && mounted;
  if (!isAllowed)
    return false;
  if (!velocity || !bounds)
    return false;
  return true;
};
function getVelocityMoveTime(contextInstance, velocity) {
  var velocityAnimation = contextInstance.setup.velocityAnimation;
  var animationTime = velocityAnimation.animationTime, maxAnimationTime = velocityAnimation.maxAnimationTime, inertia = velocityAnimation.inertia;
  return Math.min(animationTime * Math.max(1, Math.abs(velocity / inertia)), maxAnimationTime);
}
function getVelocityPosition(newPosition, startPosition, currentPosition, isLocked, limitToBounds, minPosition, maxPosition, minTarget, maxTarget, step) {
  if (limitToBounds) {
    if (startPosition > maxPosition && currentPosition > maxPosition) {
      var calculatedPosition = maxPosition + (newPosition - maxPosition) * step;
      if (calculatedPosition > maxTarget)
        return maxTarget;
      if (calculatedPosition < maxPosition)
        return maxPosition;
      return calculatedPosition;
    }
    if (startPosition < minPosition && currentPosition < minPosition) {
      var calculatedPosition = minPosition + (newPosition - minPosition) * step;
      if (calculatedPosition < minTarget)
        return minTarget;
      if (calculatedPosition > minPosition)
        return minPosition;
      return calculatedPosition;
    }
  }
  if (isLocked)
    return startPosition;
  return boundLimiter(newPosition, minPosition, maxPosition, limitToBounds);
}
function getSizeMultiplier(wrapperComponent) {
  var defaultMultiplier = 1;
  var value = wrapperComponent.offsetWidth / window.innerWidth;
  if (Number.isNaN(value)) {
    return defaultMultiplier;
  }
  return Math.min(defaultMultiplier, value);
}
var getMinMaxVelocity = function(velocity, maxStrength, sensitivity) {
  var defaultMultiplier = 0;
  var value = velocity * sensitivity;
  if (Number.isNaN(value)) {
    return defaultMultiplier;
  }
  if (velocity < 0) {
    return Math.max(value, -maxStrength);
  }
  return Math.min(value, maxStrength);
};
function handleCalculateVelocity(contextInstance, position, device) {
  var _a, _b;
  var isAllowed = isVelocityCalculationAllowed(contextInstance);
  if (!isAllowed) {
    return;
  }
  var lastMousePosition = contextInstance.lastMousePosition, velocityTime = contextInstance.velocityTime, setup = contextInstance.setup;
  var wrapperComponent = contextInstance.wrapperComponent;
  var _c = setup.velocityAnimation, maxStrengthMouse = _c.maxStrengthMouse, maxStrengthTouch = _c.maxStrengthTouch, sensitivityTouch = _c.sensitivityTouch, sensitivityMouse = _c.sensitivityMouse;
  var now = Date.now();
  if (lastMousePosition && velocityTime && wrapperComponent) {
    var sizeMultiplier = getSizeMultiplier(wrapperComponent);
    var sensitivity = (_a = {}, _a[DeviceType.TOUCH] = sensitivityTouch, _a[DeviceType.MOUSE] = sensitivityMouse, _a)[device];
    var maxStrength = (_b = {}, _b[DeviceType.TOUCH] = maxStrengthTouch, _b[DeviceType.MOUSE] = maxStrengthMouse, _b)[device];
    var distanceX = position.x - lastMousePosition.x;
    var distanceY = position.y - lastMousePosition.y;
    var velocityX = getMinMaxVelocity(distanceX / sizeMultiplier, maxStrength, sensitivity);
    var velocityY = getMinMaxVelocity(distanceY / sizeMultiplier, maxStrength, sensitivity);
    var interval = now - velocityTime;
    var speed = distanceX * distanceX + distanceY * distanceY;
    var velocity = getMinMaxVelocity(Math.sqrt(speed) / interval, maxStrength, sensitivity);
    contextInstance.velocity = { velocityX, velocityY, total: velocity };
  }
  contextInstance.lastMousePosition = position;
  contextInstance.velocityTime = now;
}
function handleVelocityPanning(contextInstance) {
  var velocity = contextInstance.velocity, bounds = contextInstance.bounds, setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
  var isAllowed = isVelocityAllowed(contextInstance);
  if (!isAllowed || !velocity || !bounds || !wrapperComponent) {
    return;
  }
  var velocityX = velocity.velocityX, velocityY = velocity.velocityY, total = velocity.total;
  var maxPositionX = bounds.maxPositionX, minPositionX = bounds.minPositionX, maxPositionY = bounds.maxPositionY, minPositionY = bounds.minPositionY;
  var limitToBounds = setup.limitToBounds, autoAlignment = setup.autoAlignment;
  var zoomAnimation = setup.zoomAnimation, panning = setup.panning;
  var lockAxisY = panning.lockAxisY, lockAxisX = panning.lockAxisX;
  var animationType = zoomAnimation.animationType;
  var sizeX = autoAlignment.sizeX, sizeY = autoAlignment.sizeY, velocityAlignmentTime = autoAlignment.velocityAlignmentTime;
  var alignAnimationTime = velocityAlignmentTime;
  var moveAnimationTime = getVelocityMoveTime(contextInstance, total);
  var finalAnimationTime = Math.max(moveAnimationTime, alignAnimationTime);
  var paddingValueX = getPaddingValue(contextInstance, sizeX);
  var paddingValueY = getPaddingValue(contextInstance, sizeY);
  var paddingX = paddingValueX * wrapperComponent.offsetWidth / 100;
  var paddingY = paddingValueY * wrapperComponent.offsetHeight / 100;
  var maxTargetX = maxPositionX + paddingX;
  var minTargetX = minPositionX - paddingX;
  var maxTargetY = maxPositionY + paddingY;
  var minTargetY = minPositionY - paddingY;
  var startState = contextInstance.state;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  handleSetupAnimation(contextInstance, animationType, finalAnimationTime, function(step) {
    var _a = contextInstance.state, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
    var frameTime = (/* @__PURE__ */ new Date()).getTime() - startTime;
    var animationProgress = frameTime / alignAnimationTime;
    var alignAnimation = animations[autoAlignment.animationType];
    var alignStep = 1 - alignAnimation(Math.min(1, animationProgress));
    var customStep = 1 - step;
    var newPositionX = positionX + velocityX * customStep;
    var newPositionY = positionY + velocityY * customStep;
    var currentPositionX = getVelocityPosition(newPositionX, startState.positionX, positionX, lockAxisX, limitToBounds, minPositionX, maxPositionX, minTargetX, maxTargetX, alignStep);
    var currentPositionY = getVelocityPosition(newPositionY, startState.positionY, positionY, lockAxisY, limitToBounds, minPositionY, maxPositionY, minTargetY, maxTargetY, alignStep);
    if (positionX !== newPositionX || positionY !== newPositionY) {
      contextInstance.setState(scale, currentPositionX, currentPositionY);
      var onPanning = contextInstance.props.onPanning;
      if (onPanning) {
        onPanning(getContext(contextInstance), {});
      }
    }
  });
}
function handlePanningStart(contextInstance, event) {
  var _a = contextInstance.state, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
  contextInstance.panStartPosition = { x: positionX, y: positionY };
  handleCancelAnimation(contextInstance);
  handleCalculateBounds(contextInstance, scale);
  if (window.TouchEvent !== void 0 && event instanceof TouchEvent) {
    handleTouchPanningSetup(contextInstance, event);
  } else {
    handlePanningSetup(contextInstance, event);
  }
}
function handleAlignToBounds(contextInstance, customAnimationTime) {
  var scale = contextInstance.state.scale;
  var _a = contextInstance.setup, minScale = _a.minScale, autoAlignment = _a.autoAlignment;
  var disabled = autoAlignment.disabled, sizeX = autoAlignment.sizeX, sizeY = autoAlignment.sizeY, animationTime = autoAlignment.animationTime, animationType = autoAlignment.animationType;
  var isDisabled = disabled || scale < minScale || !sizeX && !sizeY;
  if (isDisabled)
    return;
  var targetState = handlePanToBounds(contextInstance);
  if (targetState) {
    animate(contextInstance, targetState, animationTime, animationType);
  }
}
function handlePanning(contextInstance, clientX, clientY, device) {
  var startCoords = contextInstance.startCoords, setup = contextInstance.setup;
  var _a = setup.autoAlignment, sizeX = _a.sizeX, sizeY = _a.sizeY;
  if (!startCoords)
    return;
  var _b = getPanningClientPosition(contextInstance, clientX, clientY), x = _b.x, y = _b.y;
  var paddingValueX = getPaddingValue(contextInstance, sizeX);
  var paddingValueY = getPaddingValue(contextInstance, sizeY);
  handleCalculateVelocity(contextInstance, { x, y }, device);
  handleNewPosition(contextInstance, x, y, paddingValueX, paddingValueY);
}
function handlePanningEnd(contextInstance, velocityDisabled) {
  if (contextInstance.isPanning) {
    var velocity = contextInstance.velocity, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    contextInstance.isPanning = false;
    var _a = contextInstance.state, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
    var start = contextInstance.panStartPosition;
    contextInstance.panStartPosition = null;
    if (start) {
      var dx = positionX - start.x;
      var dy = positionY - start.y;
      if (dx * dx + dy * dy <= 25)
        return;
    }
    contextInstance.isAnimating = false;
    contextInstance.animation = null;
    var wrapperWidth = (wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.offsetWidth) || 0;
    var wrapperHeight = (wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.offsetHeight) || 0;
    var contentWidth = ((contentComponent === null || contentComponent === void 0 ? void 0 : contentComponent.offsetWidth) || 0) * scale;
    var contentHeight = ((contentComponent === null || contentComponent === void 0 ? void 0 : contentComponent.offsetHeight) || 0) * scale;
    var isContentOverflowing = !contextInstance.setup.limitToBounds || wrapperWidth < contentWidth || wrapperHeight < contentHeight;
    var shouldAnimate = !velocityDisabled && velocity && velocity.total > 0.1 && isContentOverflowing;
    if (shouldAnimate) {
      handleVelocityPanning(contextInstance);
    } else {
      handleAlignToBounds(contextInstance);
    }
  }
}
function handleZoomToPoint(contextInstance, scale, mouseX, mouseY) {
  var _a = contextInstance.setup, minScale = _a.minScale, maxScale = _a.maxScale, limitToBounds = _a.limitToBounds;
  var newScale = checkZoomBounds(roundNumber(scale, 2), minScale, maxScale, 0, false);
  var bounds = handleCalculateBounds(contextInstance, newScale);
  var _b = handleCalculateZoomPositions(contextInstance, mouseX, mouseY, newScale, bounds, limitToBounds), x = _b.x, y = _b.y;
  return { scale: newScale, positionX: x, positionY: y };
}
function handleAlignToScaleBounds(contextInstance, mousePositionX, mousePositionY) {
  var scale = contextInstance.state.scale;
  var wrapperComponent = contextInstance.wrapperComponent;
  var _a = contextInstance.setup, minScale = _a.minScale, maxScale = _a.maxScale, limitToBounds = _a.limitToBounds, zoomAnimation = _a.zoomAnimation;
  var disabled = zoomAnimation.disabled, animationTime = zoomAnimation.animationTime, animationType = zoomAnimation.animationType;
  var isWithinBounds = scale >= minScale && scale <= maxScale;
  var isDisabled = disabled || isWithinBounds;
  if (scale >= 1 || limitToBounds) {
    handleAlignToBounds(contextInstance);
  }
  if (isDisabled || !wrapperComponent || !contextInstance.mounted)
    return;
  var mouseX = mousePositionX || wrapperComponent.offsetWidth / 2;
  var mouseY = mousePositionY || wrapperComponent.offsetHeight / 2;
  var targetScale = scale < minScale ? minScale : maxScale;
  var targetState = handleZoomToPoint(contextInstance, targetScale, mouseX, mouseY);
  if (targetState) {
    animate(contextInstance, targetState, animationTime, animationType);
  }
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from, pack) {
  for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var initialState = {
  scale: 1,
  positionX: 0,
  positionY: 0
};
var initialSetup = {
  disabled: false,
  minPositionX: null,
  maxPositionX: null,
  minPositionY: null,
  maxPositionY: null,
  minScale: 1,
  maxScale: 8,
  limitToBounds: true,
  centerZoomedOut: false,
  centerOnInit: false,
  disablePadding: false,
  smooth: true,
  detached: false,
  wheel: {
    step: 0.015,
    disabled: false,
    wheelDisabled: false,
    touchPadDisabled: false,
    activationKeys: [],
    excluded: []
  },
  trackPadPanning: {
    disabled: true,
    velocityDisabled: false,
    lockAxisX: false,
    lockAxisY: false,
    activationKeys: [],
    excluded: []
  },
  panning: {
    disabled: false,
    velocityDisabled: false,
    lockAxisX: false,
    lockAxisY: false,
    allowLeftClickPan: true,
    allowMiddleClickPan: true,
    allowRightClickPan: true,
    activationKeys: [],
    excluded: []
  },
  pinch: {
    step: 5,
    disabled: false,
    allowPanning: true,
    excluded: []
  },
  doubleClick: {
    disabled: false,
    step: 0.7,
    mode: "zoomIn",
    animationType: "easeOut",
    animationTime: 200,
    excluded: []
  },
  zoomAnimation: {
    disabled: false,
    size: 0.4,
    animationTime: 200,
    animationType: "easeOut"
  },
  autoAlignment: {
    disabled: false,
    sizeX: 100,
    sizeY: 100,
    animationTime: 200,
    velocityAlignmentTime: 400,
    animationType: "easeOut"
  },
  velocityAnimation: {
    disabled: false,
    sensitivityMouse: 1,
    sensitivityTouch: 1.2,
    maxStrengthMouse: 20,
    maxStrengthTouch: 40,
    inertia: 1,
    animationTime: 300,
    maxAnimationTime: 800,
    animationType: "easeOut"
  }
};
var baseClasses = {
  wrapperClass: "react-transform-wrapper",
  contentClass: "react-transform-component"
};
var createState = function(props) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j;
  var minScale = Math.max((_a = props.minScale) !== null && _a !== void 0 ? _a : initialSetup.minScale, 1e-7);
  var maxScale = (_b = props.maxScale) !== null && _b !== void 0 ? _b : initialSetup.maxScale;
  var rawScale = (_c = props.initialScale) !== null && _c !== void 0 ? _c : initialState.scale;
  var scale = Math.min(Math.max(rawScale, minScale), maxScale);
  var positionX = boundLimiter((_d = props.initialPositionX) !== null && _d !== void 0 ? _d : initialState.positionX, (_e = props.minPositionX) !== null && _e !== void 0 ? _e : -Infinity, (_f = props.maxPositionX) !== null && _f !== void 0 ? _f : Infinity, props.minPositionX != null || props.maxPositionX != null);
  var positionY = boundLimiter((_g = props.initialPositionY) !== null && _g !== void 0 ? _g : initialState.positionY, (_h = props.minPositionY) !== null && _h !== void 0 ? _h : -Infinity, (_j = props.maxPositionY) !== null && _j !== void 0 ? _j : Infinity, props.minPositionY != null || props.maxPositionY != null);
  return {
    previousScale: scale,
    scale,
    positionX,
    positionY
  };
};
var createSetup = function(props) {
  var newSetup = __assign({}, initialSetup);
  Object.keys(props).forEach(function(key) {
    var k = key;
    var validValue = typeof props[k] !== "undefined";
    var validParameter = typeof initialSetup[k] !== "undefined";
    if (validParameter && validValue) {
      var dataType = Object.prototype.toString.call(initialSetup[k]);
      var isObject = dataType === "[object Object]";
      var isArray = dataType === "[object Array]";
      if (isObject) {
        newSetup[k] = __assign(__assign({}, initialSetup[k]), props[k]);
      } else if (isArray) {
        newSetup[k] = __spreadArray(__spreadArray([], initialSetup[k], true), props[k]);
      } else {
        newSetup[k] = props[k];
      }
    }
  });
  if (newSetup.minScale <= 0) {
    newSetup.minScale = 1e-7;
  }
  return newSetup;
};
var handleCalculateButtonZoom = function(contextInstance, delta, step) {
  var scale = contextInstance.state.scale;
  var wrapperComponent = contextInstance.wrapperComponent, setup = contextInstance.setup;
  var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation, smooth = setup.smooth;
  var size = zoomAnimation.size;
  if (!wrapperComponent) {
    throw new Error("Wrapper is not mounted");
  }
  var targetScale = smooth ? scale * Math.exp(delta * step) : scale + delta * step;
  var newScale = checkZoomBounds(roundNumber(targetScale, 3), minScale, maxScale, size, false);
  return newScale;
};
function handleZoomToViewCenter(contextInstance, delta, step, animationTime, animationType) {
  var _a, _b;
  var wrapperComponent = contextInstance.wrapperComponent;
  var _c = contextInstance.state, scale = _c.scale, positionX = _c.positionX, positionY = _c.positionY;
  var zoomAnimation = contextInstance.setup.zoomAnimation;
  if (!wrapperComponent)
    return console.error("No WrapperComponent found");
  var effectiveAnimationTime = zoomAnimation.disabled ? 0 : animationTime;
  var wrapperWidth = wrapperComponent.offsetWidth;
  var wrapperHeight = wrapperComponent.offsetHeight;
  var mouseX = (wrapperWidth / 2 - positionX) / scale;
  var mouseY = (wrapperHeight / 2 - positionY) / scale;
  var newScale = handleCalculateButtonZoom(contextInstance, delta, step);
  var targetState = handleZoomToPoint(contextInstance, newScale, mouseX, mouseY);
  if (!targetState) {
    return console.error("Error during zoom event. New transformation state was not calculated.");
  }
  var _d = contextInstance.props, onZoomStart = _d.onZoomStart, onZoom = _d.onZoom, onZoomStop = _d.onZoomStop;
  var event = new MouseEvent("mousemove", { bubbles: true });
  var ctx = getContext(contextInstance);
  handleCallback(ctx, event, onZoomStart);
  handleCallback(ctx, event, onZoom);
  animate(contextInstance, targetState, effectiveAnimationTime, animationType);
  var win = (_b = (_a = wrapperComponent.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) !== null && _b !== void 0 ? _b : typeof window !== "undefined" ? window : null;
  if (win) {
    win.setTimeout(function() {
      if (!contextInstance.mounted)
        return;
      handleCallback(getContext(contextInstance), event, onZoomStop);
    }, effectiveAnimationTime);
  }
}
function resetTransformations(contextInstance, animationTime, animationType, onResetTransformation) {
  var _a, _b;
  var setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
  var limitToBounds = setup.limitToBounds, centerOnInit = setup.centerOnInit;
  var initialTransformation = createState(contextInstance.props);
  var _c = contextInstance.state, scale = _c.scale, positionX = _c.positionX, positionY = _c.positionY;
  if (!wrapperComponent)
    return;
  var targetPositionX = initialTransformation.positionX;
  var targetPositionY = initialTransformation.positionY;
  if (centerOnInit && contentComponent) {
    var centered = getCenterPosition(initialTransformation.scale, wrapperComponent, contentComponent);
    targetPositionX = centered.positionX;
    targetPositionY = centered.positionY;
  }
  var newBounds = calculateBounds(contextInstance, initialTransformation.scale);
  var boundedPositions = getMouseBoundedPosition(targetPositionX, targetPositionY, newBounds, limitToBounds, 0, 0, wrapperComponent);
  var newState = {
    scale: initialTransformation.scale,
    positionX: boundedPositions.x,
    positionY: boundedPositions.y
  };
  if (scale === initialTransformation.scale && positionX === initialTransformation.positionX && positionY === initialTransformation.positionY) {
    return;
  }
  onResetTransformation === null || onResetTransformation === void 0 ? void 0 : onResetTransformation();
  var _d = contextInstance.props, onZoomStart = _d.onZoomStart, onZoom = _d.onZoom, onZoomStop = _d.onZoomStop;
  var event = new MouseEvent("mousemove", { bubbles: true });
  var ctx = getContext(contextInstance);
  handleCallback(ctx, event, onZoomStart);
  handleCallback(ctx, event, onZoom);
  animate(contextInstance, newState, animationTime, animationType);
  var win = (_b = (_a = wrapperComponent.ownerDocument) === null || _a === void 0 ? void 0 : _a.defaultView) !== null && _b !== void 0 ? _b : typeof window !== "undefined" ? window : null;
  if (win) {
    win.setTimeout(function() {
      if (!contextInstance.mounted)
        return;
      handleCallback(getContext(contextInstance), event, onZoomStop);
    }, animationTime);
  }
}
function getOffset(element, wrapper, content, state) {
  var offset = element.getBoundingClientRect();
  var wrapperOffset = wrapper.getBoundingClientRect();
  var contentOffset = content.getBoundingClientRect();
  var xOff = wrapperOffset.x * state.scale;
  var yOff = wrapperOffset.y * state.scale;
  return {
    x: (offset.x - contentOffset.x + xOff) / state.scale,
    y: (offset.y - contentOffset.y + yOff) / state.scale
  };
}
function calculateZoomToNode(contextInstance, node, customZoom, customOffsetX, customOffsetY) {
  if (customOffsetX === void 0) {
    customOffsetX = 0;
  }
  if (customOffsetY === void 0) {
    customOffsetY = 0;
  }
  var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent, state = contextInstance.state;
  var _a = contextInstance.setup, limitToBounds = _a.limitToBounds, minScale = _a.minScale, maxScale = _a.maxScale;
  if (!wrapperComponent || !contentComponent)
    return state;
  var wrapperRect = wrapperComponent.getBoundingClientRect();
  var nodeRect = node.getBoundingClientRect();
  var nodeOffset = getOffset(node, wrapperComponent, contentComponent, state);
  var nodeLeft = nodeOffset.x;
  var nodeTop = nodeOffset.y;
  var nodeWidth = nodeRect.width / state.scale;
  var nodeHeight = nodeRect.height / state.scale;
  var scaleX = wrapperComponent.offsetWidth / nodeWidth;
  var scaleY = wrapperComponent.offsetHeight / nodeHeight;
  var newScale = checkZoomBounds(customZoom || Math.min(scaleX, scaleY), minScale, maxScale, 0, false);
  var offsetX = (wrapperRect.width - nodeWidth * newScale) / 2;
  var offsetY = (wrapperRect.height - nodeHeight * newScale) / 2;
  var newPositionX = (wrapperRect.left - nodeLeft) * newScale + offsetX + customOffsetX;
  var newPositionY = (wrapperRect.top - nodeTop) * newScale + offsetY + customOffsetY;
  var bounds = calculateBounds(contextInstance, newScale);
  var _b = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, 0, 0, wrapperComponent), x = _b.x, y = _b.y;
  return { positionX: x, positionY: y, scale: newScale };
}
var zoomIn = function(contextInstance) {
  return function(step, animationTime, animationType) {
    if (step === void 0) {
      step = 0.5;
    }
    if (animationTime === void 0) {
      animationTime = 300;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    handleZoomToViewCenter(contextInstance, 1, step, animationTime, animationType);
  };
};
var zoomOut = function(contextInstance) {
  return function(step, animationTime, animationType) {
    if (step === void 0) {
      step = 0.5;
    }
    if (animationTime === void 0) {
      animationTime = 300;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    handleZoomToViewCenter(contextInstance, -1, step, animationTime, animationType);
  };
};
var setTransform = function(contextInstance) {
  return function(newPositionX, newPositionY, newScale, animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 300;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    var _a = contextInstance.state, positionX = _a.positionX, positionY = _a.positionY, scale = _a.scale;
    var wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    var disabled = contextInstance.setup.disabled;
    if (disabled || !wrapperComponent || !contentComponent)
      return;
    var targetState = {
      positionX: Number.isNaN(newPositionX) ? positionX : newPositionX,
      positionY: Number.isNaN(newPositionY) ? positionY : newPositionY,
      scale: Number.isNaN(newScale) ? scale : newScale
    };
    animate(contextInstance, targetState, animationTime, animationType);
  };
};
var resetTransform = function(contextInstance) {
  return function(animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 200;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    resetTransformations(contextInstance, animationTime, animationType);
  };
};
var centerView = function(contextInstance) {
  return function(scale, animationTime, animationType) {
    if (animationTime === void 0) {
      animationTime = 200;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    var state = contextInstance.state, wrapperComponent = contextInstance.wrapperComponent, contentComponent = contextInstance.contentComponent;
    if (wrapperComponent && contentComponent) {
      var targetState = getCenterPosition(scale || state.scale, wrapperComponent, contentComponent);
      animate(contextInstance, targetState, animationTime, animationType);
    }
  };
};
var zoomToElement = function(contextInstance) {
  return function(node, scale, animationTime, animationType, offsetX, offsetY) {
    if (animationTime === void 0) {
      animationTime = 600;
    }
    if (animationType === void 0) {
      animationType = "easeOut";
    }
    if (offsetX === void 0) {
      offsetX = 0;
    }
    if (offsetY === void 0) {
      offsetY = 0;
    }
    handleCancelAnimation(contextInstance);
    var wrapperComponent = contextInstance.wrapperComponent;
    var target = typeof node === "string" ? document.getElementById(node) : node;
    if (wrapperComponent && target && wrapperComponent.contains(target)) {
      var targetState = calculateZoomToNode(contextInstance, target, scale, offsetX, offsetY);
      animate(contextInstance, targetState, animationTime, animationType);
    }
  };
};
var getControls = function(contextInstance) {
  return {
    instance: contextInstance,
    state: contextInstance.state,
    zoomIn: zoomIn(contextInstance),
    zoomOut: zoomOut(contextInstance),
    setTransform: setTransform(contextInstance),
    resetTransform: resetTransform(contextInstance),
    centerView: centerView(contextInstance),
    zoomToElement: zoomToElement(contextInstance)
  };
};
var getState = function(contextInstance) {
  return {
    instance: contextInstance,
    state: contextInstance.state
  };
};
var getContext = function(contextInstance) {
  var ref = {};
  Object.assign(ref, getState(contextInstance));
  Object.assign(ref, getControls(contextInstance));
  return ref;
};
var passiveSupported = false;
function makePassiveEventOption() {
  try {
    var options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    return options;
  } catch (err) {
    passiveSupported = false;
    return passiveSupported;
  }
}
var matchPrefix = ".".concat(baseClasses.wrapperClass);
var isExcludedNode = function(node, excluded) {
  return excluded.some(function(exclude) {
    return node.matches("".concat(matchPrefix, " ").concat(exclude, ", ").concat(matchPrefix, " .").concat(exclude, ", ").concat(matchPrefix, " ").concat(exclude, " *, ").concat(matchPrefix, " .").concat(exclude, " *"));
  });
};
var cancelTimeout = function(timeout) {
  if (timeout) {
    clearTimeout(timeout);
  }
};
var roundScaleForTransform = function(scale) {
  return Number.parseFloat(scale.toFixed(8));
};
var getTransformStyles = function(x, y, scale) {
  var s = roundScaleForTransform(scale);
  return "translate(".concat(x, "px, ").concat(y, "px) scale(").concat(s, ")");
};
var getCenterPosition = function(scale, wrapperComponent, contentComponent) {
  var contentWidth = contentComponent.offsetWidth * scale;
  var contentHeight = contentComponent.offsetHeight * scale;
  var centerPositionX = (wrapperComponent.offsetWidth - contentWidth) / 2;
  var centerPositionY = (wrapperComponent.offsetHeight - contentHeight) / 2;
  return {
    scale,
    positionX: centerPositionX,
    positionY: centerPositionY
  };
};
function assignRef(ref, value) {
  if (ref == null)
    return;
  if (typeof ref === "function") {
    ref(value);
  } else {
    ref.current = value;
  }
}
function mergeRefs(refs) {
  return function(value) {
    refs.forEach(function(ref) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}
var isWheelAllowed = function(contextInstance, event) {
  var _a = contextInstance.setup.wheel, disabled = _a.disabled, wheelDisabled = _a.wheelDisabled, touchPadDisabled = _a.touchPadDisabled, excluded = _a.excluded;
  var isInitialized = contextInstance.isInitialized, isPanning = contextInstance.isPanning;
  var target = event.target;
  var isAllowed = isInitialized && !isPanning && !disabled && target;
  if (!isAllowed)
    return false;
  if (wheelDisabled && !event.ctrlKey)
    return false;
  if (touchPadDisabled && event.ctrlKey)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  var keysPressed = contextInstance.isPressingKeys(contextInstance.setup.wheel.activationKeys);
  if (!keysPressed)
    return false;
  return true;
};
var isWheelPanningAllowed = function(contextInstance, event) {
  var _a = contextInstance.setup, disabled = _a.disabled, trackPadPanning = _a.trackPadPanning;
  var activationKeys = trackPadPanning.activationKeys, excluded = trackPadPanning.excluded;
  if (!contextInstance.wrapperComponent || !contextInstance.contentComponent) {
    return false;
  }
  if (disabled || trackPadPanning.disabled || event.ctrlKey) {
    return false;
  }
  var isAllowed = isWheelAllowed(contextInstance, event);
  if (isAllowed)
    return false;
  var target = event.target;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  var keysPressed = contextInstance.isPressingKeys(activationKeys);
  if (!keysPressed)
    return false;
  return true;
};
var getDeltaY = function(event) {
  if (event) {
    return event.deltaY < 0 ? 1 : -1;
  }
  return 0;
};
function getDelta(event, customDelta) {
  var deltaY = getDeltaY(event);
  var delta = checkIsNumber(customDelta, deltaY);
  return delta;
}
function getMousePosition(event, contentComponent, scale) {
  var contentRect = contentComponent.getBoundingClientRect();
  var mouseX = 0;
  var mouseY = 0;
  if ("clientX" in event) {
    mouseX = (event.clientX - contentRect.left) / scale;
    mouseY = (event.clientY - contentRect.top) / scale;
  } else {
    var touch = event.touches[0];
    mouseX = (touch.clientX - contentRect.left) / scale;
    mouseY = (touch.clientY - contentRect.top) / scale;
  }
  if (Number.isNaN(mouseX) || Number.isNaN(mouseY))
    console.error("No mouse or touch offset found");
  return {
    x: mouseX,
    y: mouseY
  };
}
var handleCalculateWheelZoom = function(contextInstance, delta, step, disable, getTarget) {
  var scale = contextInstance.state.scale;
  var wrapperComponent = contextInstance.wrapperComponent, setup = contextInstance.setup;
  var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation, disablePadding = setup.disablePadding;
  var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
  if (!wrapperComponent) {
    throw new Error("Wrapper is not mounted");
  }
  var targetScale = scale + delta * step;
  var paddingEnabled = disable ? false : !disabled;
  var newScale = checkZoomBounds(targetScale, minScale, maxScale, size, paddingEnabled && !disablePadding);
  return newScale;
};
var handleWheelZoomStop = function(contextInstance, event) {
  var previousWheelEvent = contextInstance.previousWheelEvent;
  var scale = contextInstance.state.scale;
  var _a = contextInstance.setup, maxScale = _a.maxScale, minScale = _a.minScale;
  if (!previousWheelEvent)
    return false;
  if (scale < maxScale || scale > minScale)
    return true;
  if (Math.sign(previousWheelEvent.deltaY) !== Math.sign(event.deltaY))
    return true;
  if (previousWheelEvent.deltaY > 0 && previousWheelEvent.deltaY < event.deltaY)
    return true;
  if (previousWheelEvent.deltaY < 0 && previousWheelEvent.deltaY > event.deltaY)
    return true;
  if (Math.sign(previousWheelEvent.deltaY) !== Math.sign(event.deltaY))
    return true;
  return false;
};
var isPinchStartAllowed = function(contextInstance, event) {
  var _a = contextInstance.setup.pinch, disabled = _a.disabled, excluded = _a.excluded;
  var isInitialized = contextInstance.isInitialized;
  var target = event.target;
  var isAllowed = isInitialized && !disabled && target;
  if (!isAllowed)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  return true;
};
var isPinchAllowed = function(contextInstance) {
  var disabled = contextInstance.setup.pinch.disabled;
  var isInitialized = contextInstance.isInitialized, pinchStartDistance = contextInstance.pinchStartDistance;
  var isAllowed = isInitialized && !disabled && pinchStartDistance !== null;
  if (!isAllowed)
    return false;
  return true;
};
var calculateTouchMidPoint = function(event, scale, contentComponent) {
  var contentRect = contentComponent.getBoundingClientRect();
  var touches = event.touches;
  var firstPointX = touches[0].clientX - contentRect.left;
  var firstPointY = touches[0].clientY - contentRect.top;
  var secondPointX = touches[1].clientX - contentRect.left;
  var secondPointY = touches[1].clientY - contentRect.top;
  return {
    x: (firstPointX + secondPointX) / 2 / scale,
    y: (firstPointY + secondPointY) / 2 / scale
  };
};
var getTouchDistance = function(event) {
  return Math.sqrt(Math.pow(event.touches[0].pageX - event.touches[1].pageX, 2) + Math.pow(event.touches[0].pageY - event.touches[1].pageY, 2));
};
var DEFAULT_PINCH_STEP = 5;
var calculatePinchZoom = function(contextInstance, currentDistance) {
  var pinchStartScale = contextInstance.pinchStartScale, pinchStartDistance = contextInstance.pinchStartDistance, setup = contextInstance.setup;
  var maxScale = setup.maxScale, minScale = setup.minScale, zoomAnimation = setup.zoomAnimation, disablePadding = setup.disablePadding, pinch = setup.pinch;
  var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
  var step = pinch.step;
  if (!pinchStartScale || pinchStartDistance === null) {
    throw new Error("Pinch touches distance was not provided");
  }
  if (currentDistance < 0) {
    return contextInstance.state.scale;
  }
  var touchProportion = currentDistance / pinchStartDistance;
  var rawScale = touchProportion * pinchStartScale;
  var scaleDelta = (rawScale - pinchStartScale) * (step / DEFAULT_PINCH_STEP);
  var computed = pinchStartScale + scaleDelta;
  var scale = computed === Infinity ? 0 : roundNumber(computed, 10);
  return checkZoomBounds(scale, minScale, maxScale, size, !disabled && !disablePadding);
};
var wheelStopEventTime = 160;
var wheelAnimationTime = 100;
var handleWheelStart = function(contextInstance, event) {
  var _a = contextInstance.props, onWheelStart = _a.onWheelStart, onZoomStart = _a.onZoomStart;
  if (!contextInstance.wheelStopEventTimer) {
    handleCancelAnimation(contextInstance);
    handleCallback(getContext(contextInstance), event, onWheelStart);
    handleCallback(getContext(contextInstance), event, onZoomStart);
  }
};
var handleWheelZoom = function(contextInstance, event) {
  var _a = contextInstance.props, onWheel = _a.onWheel, onZoom = _a.onZoom;
  var contentComponent = contextInstance.contentComponent, setup = contextInstance.setup, state = contextInstance.state;
  var scale = state.scale;
  var limitToBounds = setup.limitToBounds, centerZoomedOut = setup.centerZoomedOut, zoomAnimation = setup.zoomAnimation, wheel = setup.wheel, disablePadding = setup.disablePadding, smooth = setup.smooth;
  var size = zoomAnimation.size, disabled = zoomAnimation.disabled;
  var step = wheel.step;
  if (!contentComponent) {
    throw new Error("Component not mounted");
  }
  event.preventDefault();
  event.stopPropagation();
  var delta = getDelta(event, null);
  var zoomStep = smooth ? step * Math.abs(event.deltaY) : step;
  var newScale = handleCalculateWheelZoom(contextInstance, delta, zoomStep, !event.ctrlKey);
  if (scale === newScale)
    return;
  var bounds = handleCalculateBounds(contextInstance, newScale);
  var mousePosition = getMousePosition(event, contentComponent, scale);
  var isPaddingDisabled = disabled || size === 0 || centerZoomedOut || disablePadding;
  var isLimitedToBounds = limitToBounds && isPaddingDisabled;
  var _b = handleCalculateZoomPositions(contextInstance, mousePosition.x, mousePosition.y, newScale, bounds, isLimitedToBounds), x = _b.x, y = _b.y;
  contextInstance.previousWheelEvent = event;
  contextInstance.setState(newScale, x, y);
  handleCallback(getContext(contextInstance), event, onWheel);
  handleCallback(getContext(contextInstance), event, onZoom);
};
var handleWheelStop = function(contextInstance, event) {
  var _a = contextInstance.props, onWheelStop = _a.onWheelStop, onZoomStop = _a.onZoomStop;
  cancelTimeout(contextInstance.wheelAnimationTimer);
  contextInstance.wheelAnimationTimer = setTimeout(function() {
    if (!contextInstance.mounted)
      return;
    handleAlignToScaleBounds(contextInstance, event.x, event.y);
    contextInstance.wheelAnimationTimer = null;
  }, wheelAnimationTime);
  var hasStoppedZooming = handleWheelZoomStop(contextInstance, event);
  if (hasStoppedZooming) {
    cancelTimeout(contextInstance.wheelStopEventTimer);
    contextInstance.wheelStopEventTimer = setTimeout(function() {
      if (!contextInstance.mounted)
        return;
      contextInstance.wheelStopEventTimer = null;
      handleCallback(getContext(contextInstance), event, onWheelStop);
      handleCallback(getContext(contextInstance), event, onZoomStop);
    }, wheelStopEventTime);
  }
};
var handleWheelPanningStart = function(contextInstance, event) {
  var _a = contextInstance.props, onWheelStart = _a.onWheelStart, onPanningStart = _a.onPanningStart;
  if (!contextInstance.wheelStopEventTimer) {
    handleCancelAnimation(contextInstance);
    handleCallback(getContext(contextInstance), event, onWheelStart);
    handleCallback(getContext(contextInstance), event, onPanningStart);
  }
};
var handleWheelPanningStop = function(contextInstance, event) {
  var _a = contextInstance.props, onWheelStop = _a.onWheelStop, onPanningStop = _a.onPanningStop;
  cancelTimeout(contextInstance.wheelAnimationTimer);
  contextInstance.wheelAnimationTimer = setTimeout(function() {
    if (!contextInstance.mounted)
      return;
    handleAlignToScaleBounds(contextInstance, event.x, event.y);
    contextInstance.wheelAnimationTimer = null;
  }, wheelAnimationTime);
  var hasStoppedZooming = handleWheelZoomStop(contextInstance, event);
  if (hasStoppedZooming) {
    cancelTimeout(contextInstance.wheelStopEventTimer);
    contextInstance.wheelStopEventTimer = setTimeout(function() {
      if (!contextInstance.mounted)
        return;
      contextInstance.wheelStopEventTimer = null;
      handleCallback(getContext(contextInstance), event, onWheelStop);
      handleCallback(getContext(contextInstance), event, onPanningStop);
    }, wheelStopEventTime);
  }
};
var getTouchCenter = function(event) {
  var totalX = 0;
  var totalY = 0;
  for (var i = 0; i < 2; i += 1) {
    totalX += event.touches[i].clientX;
    totalY += event.touches[i].clientY;
  }
  var x = totalX / 2;
  var y = totalY / 2;
  return { x, y };
};
var handlePinchStart = function(contextInstance, event) {
  var distance = getTouchDistance(event);
  contextInstance.pinchStartDistance = distance;
  contextInstance.lastDistance = distance;
  contextInstance.pinchStartScale = contextInstance.state.scale;
  contextInstance.isPanning = false;
  contextInstance.isPinching = true;
  contextInstance.pinchPreviousCenter = getTouchCenter(event);
  handleCancelAnimation(contextInstance);
};
var handlePinchZoom = function(contextInstance, event) {
  var contentComponent = contextInstance.contentComponent, pinchStartDistance = contextInstance.pinchStartDistance, wrapperComponent = contextInstance.wrapperComponent, pinchPreviousCenter = contextInstance.pinchPreviousCenter;
  var scale = contextInstance.state.scale;
  var _a = contextInstance.setup, limitToBounds = _a.limitToBounds, centerZoomedOut = _a.centerZoomedOut, zoomAnimation = _a.zoomAnimation, autoAlignment = _a.autoAlignment, pinch = _a.pinch, panning = _a.panning;
  var disabled = zoomAnimation.disabled, size = zoomAnimation.size;
  var allowPanning = pinch.allowPanning;
  if (pinchStartDistance === null || !contentComponent)
    return;
  var midPoint = calculateTouchMidPoint(event, scale, contentComponent);
  if (!Number.isFinite(midPoint.x) || !Number.isFinite(midPoint.y))
    return;
  var currentDistance = getTouchDistance(event);
  var newScale = calculatePinchZoom(contextInstance, currentDistance);
  var center = getTouchCenter(event);
  var scaleDiff = scale / newScale;
  var panX = (center.x - ((pinchPreviousCenter === null || pinchPreviousCenter === void 0 ? void 0 : pinchPreviousCenter.x) || 0)) * scaleDiff;
  var panY = (center.y - ((pinchPreviousCenter === null || pinchPreviousCenter === void 0 ? void 0 : pinchPreviousCenter.y) || 0)) * scaleDiff;
  if (newScale === scale && panX === 0 && panY === 0)
    return;
  contextInstance.pinchPreviousCenter = center;
  var bounds = handleCalculateBounds(contextInstance, newScale);
  var isPaddingDisabled = disabled || size === 0 || centerZoomedOut;
  var isLimitedToBounds = limitToBounds && isPaddingDisabled;
  var _b = handleCalculateZoomPositions(contextInstance, midPoint.x, midPoint.y, newScale, bounds, isLimitedToBounds), x = _b.x, y = _b.y;
  contextInstance.pinchMidpoint = midPoint;
  contextInstance.lastDistance = currentDistance;
  if (panning.disabled || !allowPanning) {
    contextInstance.setState(newScale, x, y);
  } else {
    var sizeX = autoAlignment.sizeX, sizeY = autoAlignment.sizeY;
    var paddingValueX = getPaddingValue(contextInstance, sizeX, newScale);
    var paddingValueY = getPaddingValue(contextInstance, sizeY, newScale);
    var newPositionX = x + panX;
    var newPositionY = y + panY;
    var _c = getMouseBoundedPosition(newPositionX, newPositionY, bounds, limitToBounds, paddingValueX, paddingValueY, wrapperComponent), finalX = _c.x, finalY = _c.y;
    contextInstance.setState(newScale, finalX, finalY);
  }
};
var handlePinchStop = function(contextInstance) {
  var pinchMidpoint = contextInstance.pinchMidpoint;
  contextInstance.velocity = null;
  contextInstance.lastDistance = null;
  contextInstance.pinchMidpoint = null;
  contextInstance.pinchStartScale = null;
  contextInstance.pinchStartDistance = null;
  contextInstance.isPinching = false;
  handleAlignToScaleBounds(contextInstance, pinchMidpoint === null || pinchMidpoint === void 0 ? void 0 : pinchMidpoint.x, pinchMidpoint === null || pinchMidpoint === void 0 ? void 0 : pinchMidpoint.y);
};
var handleDoubleClickStop = function(contextInstance, event) {
  var onZoomStop = contextInstance.props.onZoomStop;
  var animationTime = contextInstance.setup.doubleClick.animationTime;
  cancelTimeout(contextInstance.doubleClickStopEventTimer);
  contextInstance.doubleClickStopEventTimer = setTimeout(function() {
    contextInstance.doubleClickStopEventTimer = null;
    handleCallback(getContext(contextInstance), event, onZoomStop);
  }, animationTime);
};
var handleDoubleClickResetMode = function(contextInstance, event) {
  var _a = contextInstance.props, onZoomStart = _a.onZoomStart, onZoom = _a.onZoom;
  var _b = contextInstance.setup.doubleClick, animationTime = _b.animationTime, animationType = _b.animationType;
  handleCallback(getContext(contextInstance), event, onZoomStart);
  resetTransformations(contextInstance, animationTime, animationType, function() {
    return handleCallback(getContext(contextInstance), event, onZoom);
  });
  handleDoubleClickStop(contextInstance, event);
};
function getDoubleClickScale(mode, scale) {
  if (mode === "toggle") {
    return scale === 1 ? 1 : -1;
  }
  return mode === "zoomOut" ? -1 : 1;
}
function handleDoubleClick(contextInstance, event) {
  var setup = contextInstance.setup, doubleClickStopEventTimer = contextInstance.doubleClickStopEventTimer, state = contextInstance.state, contentComponent = contextInstance.contentComponent;
  var scale = state.scale;
  var _a = contextInstance.props, onZoomStart = _a.onZoomStart, onZoom = _a.onZoom;
  var _b = setup.doubleClick, disabled = _b.disabled, mode = _b.mode, step = _b.step, animationTime = _b.animationTime, animationType = _b.animationType;
  if (disabled)
    return;
  if (doubleClickStopEventTimer)
    return;
  if (mode === "reset") {
    return handleDoubleClickResetMode(contextInstance, event);
  }
  if (!contentComponent)
    return console.error("No ContentComponent found");
  var delta = getDoubleClickScale(mode, contextInstance.state.scale);
  var newScale = handleCalculateButtonZoom(contextInstance, delta, step);
  if (scale === newScale)
    return;
  handleCallback(getContext(contextInstance), event, onZoomStart);
  var mousePosition = getMousePosition(event, contentComponent, scale);
  var targetState = handleZoomToPoint(contextInstance, newScale, mousePosition.x, mousePosition.y);
  if (!targetState) {
    return console.error("Error during zoom event. New transformation state was not calculated.");
  }
  handleCallback(getContext(contextInstance), event, onZoom);
  animate(contextInstance, targetState, animationTime, animationType);
  handleDoubleClickStop(contextInstance, event);
}
var isDoubleClickAllowed = function(contextInstance, event) {
  var isInitialized = contextInstance.isInitialized, setup = contextInstance.setup, wrapperComponent = contextInstance.wrapperComponent;
  var _a = setup.doubleClick, disabled = _a.disabled, excluded = _a.excluded;
  var target = event.target;
  var isWrapperChild = wrapperComponent === null || wrapperComponent === void 0 ? void 0 : wrapperComponent.contains(target);
  var isAllowed = isInitialized && target && isWrapperChild && !disabled;
  if (!isAllowed)
    return false;
  var isExcluded = isExcludedNode(target, excluded);
  if (isExcluded)
    return false;
  return true;
};
var ZoomPanPinch = (
  /** @class */
  /* @__PURE__ */ (function() {
    function ZoomPanPinch2(props) {
      var _this = this;
      this.mounted = true;
      this.onChangeCallbacks = /* @__PURE__ */ new Set();
      this.onInitCallbacks = /* @__PURE__ */ new Set();
      this.onTransformCallbacks = /* @__PURE__ */ new Set();
      this.wrapperComponent = null;
      this.contentComponent = null;
      this.isInitialized = false;
      this.bounds = null;
      this.previousWheelEvent = null;
      this.wheelStopEventTimer = null;
      this.wheelAnimationTimer = null;
      this.isPanning = false;
      this.isWheelPanning = false;
      this.startCoords = null;
      this.panStartPosition = null;
      this.lastTouch = null;
      this.isPinching = false;
      this.distance = null;
      this.lastDistance = null;
      this.pinchStartDistance = null;
      this.pinchStartScale = null;
      this.pinchMidpoint = null;
      this.pinchPreviousCenter = null;
      this.doubleClickStopEventTimer = null;
      this.velocity = null;
      this.velocityTime = null;
      this.lastMousePosition = null;
      this.isAnimating = false;
      this.animation = null;
      this.pressedKeys = {};
      this.mount = function() {
        _this.initializeWindowEvents();
      };
      this.unmount = function() {
        _this.cleanupWindowEvents();
      };
      this.update = function(newProps) {
        _this.props = newProps;
        if (_this.wrapperComponent && _this.contentComponent) {
          handleCalculateBounds(_this, _this.state.scale);
        }
        _this.setup = createSetup(newProps);
      };
      this.initializeWindowEvents = function() {
        var _a, _b, _c, _d;
        var passive = makePassiveEventOption();
        var currentDocument = (_a = _this.wrapperComponent) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        var currentWindow = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.defaultView;
        (_b = _this.wrapperComponent) === null || _b === void 0 ? void 0 : _b.addEventListener("wheel", _this.onWheelPanning, passive);
        (_c = _this.wrapperComponent) === null || _c === void 0 ? void 0 : _c.addEventListener("keyup", _this.setKeyUnPressed, passive);
        (_d = _this.wrapperComponent) === null || _d === void 0 ? void 0 : _d.addEventListener("keydown", _this.setKeyPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("mousedown", _this.onPanningStart, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("mousemove", _this.onPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("mouseup", _this.onPanningStop, passive);
        currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.addEventListener("mouseleave", _this.clearPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("keyup", _this.setKeyUnPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("keydown", _this.setKeyPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.addEventListener("blur", _this.handleWindowBlur);
      };
      this.cleanupWindowEvents = function() {
        var _a, _b, _c, _d, _e;
        var passive = makePassiveEventOption();
        var currentDocument = (_a = _this.wrapperComponent) === null || _a === void 0 ? void 0 : _a.ownerDocument;
        var currentWindow = currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.defaultView;
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("mousedown", _this.onPanningStart, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("mousemove", _this.onPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("mouseup", _this.onPanningStop, passive);
        currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.removeEventListener("mouseleave", _this.clearPanning, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("keyup", _this.setKeyUnPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("keydown", _this.setKeyPressed, passive);
        currentWindow === null || currentWindow === void 0 ? void 0 : currentWindow.removeEventListener("blur", _this.handleWindowBlur);
        document.removeEventListener("mouseleave", _this.clearPanning, passive);
        (_b = _this.wrapperComponent) === null || _b === void 0 ? void 0 : _b.removeEventListener("wheel", _this.onWheelPanning, passive);
        (_c = _this.wrapperComponent) === null || _c === void 0 ? void 0 : _c.removeEventListener("keyup", _this.setKeyUnPressed, passive);
        (_d = _this.wrapperComponent) === null || _d === void 0 ? void 0 : _d.removeEventListener("keydown", _this.setKeyPressed, passive);
        handleCancelAnimation(_this);
        (_e = _this.observer) === null || _e === void 0 ? void 0 : _e.disconnect();
      };
      this.handleInitializeWrapperEvents = function(wrapper) {
        var passive = makePassiveEventOption();
        wrapper.addEventListener("wheel", _this.onWheelZoom, passive);
        wrapper.addEventListener("dblclick", _this.onDoubleClick, passive);
        wrapper.addEventListener("touchstart", _this.onTouchPanningStart, passive);
        wrapper.addEventListener("touchmove", _this.onTouchPanning, passive);
        wrapper.addEventListener("touchend", _this.onTouchPanningStop, passive);
      };
      this.handleInitialize = function(contentComponent) {
        var centerOnInit = _this.setup.centerOnInit;
        _this.applyTransformation();
        _this.onInitCallbacks.forEach(function(callback) {
          return callback(getContext(_this));
        });
        if (centerOnInit) {
          _this.setCenter();
          _this.observer = new ResizeObserver(function() {
            var _a;
            var currentWidth = contentComponent.offsetWidth;
            var currentHeight = contentComponent.offsetHeight;
            if (currentWidth > 0 || currentHeight > 0) {
              _this.onInitCallbacks.forEach(function(callback) {
                return callback(getContext(_this));
              });
              _this.setCenter();
              (_a = _this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
            }
          });
          setTimeout(function() {
            var _a;
            (_a = _this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
          }, 5e3);
          _this.observer.observe(contentComponent);
        }
      };
      this.onWheelZoom = function(event) {
        var disabled = _this.setup.disabled;
        if (disabled)
          return;
        _this.syncModifierKeys(event);
        var isAllowed = isWheelAllowed(_this, event);
        if (!isAllowed)
          return;
        handleWheelStart(_this, event);
        handleWheelZoom(_this, event);
        handleWheelStop(_this, event);
      };
      this.onWheelPanning = function(event) {
        var onPanning = _this.props.onPanning;
        var trackPadPanning = _this.setup.trackPadPanning;
        var lockAxisX = trackPadPanning.lockAxisX, lockAxisY = trackPadPanning.lockAxisY;
        _this.syncModifierKeys(event);
        var isAllowed = isWheelPanningAllowed(_this, event);
        if (!isAllowed)
          return;
        event.preventDefault();
        event.stopPropagation();
        var _a = _this.state, positionX = _a.positionX, positionY = _a.positionY;
        var mouseX = positionX - event.deltaX;
        var mouseY = positionY - event.deltaY;
        var newPositionX = lockAxisX ? positionX : mouseX;
        var newPositionY = lockAxisY ? positionY : mouseY;
        var _b = _this.setup.autoAlignment, sizeX = _b.sizeX, sizeY = _b.sizeY;
        var paddingValueX = getPaddingValue(_this, sizeX);
        var paddingValueY = getPaddingValue(_this, sizeY);
        if (newPositionX === positionX && newPositionY === positionY)
          return;
        handleWheelPanningStart(_this, event);
        handleNewPosition(_this, newPositionX, newPositionY, paddingValueX, paddingValueY);
        handleCallback(getContext(_this), event, onPanning);
        handleWheelPanningStop(_this, event);
      };
      this.onPanningStart = function(event) {
        var disabled = _this.setup.disabled;
        var onPanningStart = _this.props.onPanningStart;
        if (disabled)
          return;
        _this.syncModifierKeys(event);
        var isAllowed = isPanningStartAllowed(_this, event);
        if (!isAllowed)
          return;
        var keysPressed = _this.isPressingKeys(_this.setup.panning.activationKeys);
        if (!keysPressed)
          return;
        if (event.button === 0 && !_this.setup.panning.allowLeftClickPan)
          return;
        if (event.button === 1 && !_this.setup.panning.allowMiddleClickPan)
          return;
        if (event.button === 2 && !_this.setup.panning.allowRightClickPan)
          return;
        event.preventDefault();
        event.stopPropagation();
        handleCancelAnimation(_this);
        handlePanningStart(_this, event);
        handleCallback(getContext(_this), event, onPanningStart);
      };
      this.onPanning = function(event) {
        var disabled = _this.setup.disabled;
        var onPanning = _this.props.onPanning;
        if (disabled)
          return;
        _this.syncModifierKeys(event);
        if (_this.isPanning && event.buttons === 0) {
          _this.clearPanning(event);
          return;
        }
        var isAllowed = isPanningAllowed(_this);
        if (!isAllowed)
          return;
        var keysPressed = _this.isPressingKeys(_this.setup.panning.activationKeys);
        if (!keysPressed)
          return;
        event.preventDefault();
        event.stopPropagation();
        handlePanning(_this, event.clientX, event.clientY, DeviceType.MOUSE);
        handleCallback(getContext(_this), event, onPanning);
      };
      this.onPanningStop = function(event) {
        var velocityDisabled = _this.setup.panning.velocityDisabled;
        var onPanningStop = _this.props.onPanningStop;
        if (_this.isPanning) {
          handlePanningEnd(_this, velocityDisabled);
          handleCallback(getContext(_this), event, onPanningStop);
        }
      };
      this.onPinchStart = function(event) {
        var disabled = _this.setup.disabled;
        var onPinchStart = _this.props.onPinchStart;
        if (disabled)
          return;
        var isAllowed = isPinchStartAllowed(_this, event);
        if (!isAllowed)
          return;
        handlePinchStart(_this, event);
        handleCancelAnimation(_this);
        handleCallback(getContext(_this), event, onPinchStart);
      };
      this.onPinch = function(event) {
        var disabled = _this.setup.disabled;
        var onPinch = _this.props.onPinch;
        if (disabled)
          return;
        var isAllowed = isPinchAllowed(_this);
        if (!isAllowed)
          return;
        event.preventDefault();
        event.stopPropagation();
        handlePinchZoom(_this, event);
        handleCallback(getContext(_this), event, onPinch);
      };
      this.onPinchStop = function(event) {
        var onPinchStop = _this.props.onPinchStop;
        if (_this.pinchStartScale) {
          handlePinchStop(_this);
          handleCallback(getContext(_this), event, onPinchStop);
        }
      };
      this.onTouchPanningStart = function(event) {
        var _a = _this.setup, disabled = _a.disabled, doubleClick = _a.doubleClick;
        var onPanningStart = _this.props.onPanningStart;
        if (disabled)
          return;
        var isDoubleTapAllowed = !(doubleClick === null || doubleClick === void 0 ? void 0 : doubleClick.disabled);
        var isDoubleTap = _this.lastTouch && +/* @__PURE__ */ new Date() - _this.lastTouch < 200;
        if (isDoubleTapAllowed && isDoubleTap && event.touches.length === 1) {
          _this.onDoubleClick(event);
        } else {
          _this.lastTouch = +/* @__PURE__ */ new Date();
          handleCancelAnimation(_this);
          var touches = event.touches;
          var isPanningAction = touches.length === 1;
          var isPinchAction = touches.length === 2;
          var isAllowed = isPanningStartAllowed(_this, event);
          if (isPanningAction) {
            if (!isAllowed)
              return;
            handleCancelAnimation(_this);
            handlePanningStart(_this, event);
            handleCallback(getContext(_this), event, onPanningStart);
          }
          if (isPinchAction) {
            _this.onPinchStart(event);
          }
        }
      };
      this.onTouchPanning = function(event) {
        var disabled = _this.setup.disabled;
        var onPanning = _this.props.onPanning;
        if (_this.isPanning && event.touches.length === 1) {
          if (disabled)
            return;
          var isAllowed = isPanningAllowed(_this);
          if (!isAllowed)
            return;
          if (event.cancelable) {
            event.preventDefault();
          }
          event.stopPropagation();
          var touch = event.touches[0];
          handlePanning(_this, touch.clientX, touch.clientY, DeviceType.TOUCH);
          handleCallback(getContext(_this), event, onPanning);
        } else if (event.touches.length > 1) {
          _this.onPinch(event);
        }
      };
      this.onTouchPanningStop = function(event) {
        _this.onPanningStop(event);
        _this.onPinchStop(event);
      };
      this.onDoubleClick = function(event) {
        var disabled = _this.setup.disabled;
        if (disabled)
          return;
        var isAllowed = isDoubleClickAllowed(_this, event);
        if (!isAllowed)
          return;
        handleDoubleClick(_this, event);
      };
      this.clearPanning = function(event) {
        if (_this.isPanning) {
          _this.onPanningStop(event);
        }
      };
      this.handleWindowBlur = function() {
        _this.pressedKeys = {};
        if (_this.isPanning) {
          _this.isPanning = false;
          _this.startCoords = null;
        }
      };
      this.syncModifierKeys = function(event) {
        var ctrlKey = event.ctrlKey, metaKey = event.metaKey, shiftKey = event.shiftKey, altKey = event.altKey;
        if (typeof ctrlKey === "boolean")
          _this.pressedKeys.Control = ctrlKey;
        if (typeof metaKey === "boolean")
          _this.pressedKeys.Meta = metaKey;
        if (typeof shiftKey === "boolean")
          _this.pressedKeys.Shift = shiftKey;
        if (typeof altKey === "boolean")
          _this.pressedKeys.Alt = altKey;
      };
      this.setKeyPressed = function(e) {
        _this.pressedKeys[e.key] = true;
      };
      this.setKeyUnPressed = function(e) {
        _this.pressedKeys[e.key] = false;
      };
      this.isPressingKeys = function(keys) {
        if (typeof keys === "function") {
          return keys(Object.entries(_this.pressedKeys).filter(function(_a) {
            var pressed = _a[1];
            return pressed;
          }).map(function(_a) {
            var key = _a[0];
            return key;
          }));
        }
        if (!keys.length) {
          return true;
        }
        return Boolean(keys.every(function(key) {
          return _this.pressedKeys[key];
        }));
      };
      this.setCenter = function() {
        if (_this.wrapperComponent && _this.contentComponent) {
          var targetState = getCenterPosition(_this.state.scale, _this.wrapperComponent, _this.contentComponent);
          _this.setState(targetState.scale, targetState.positionX, targetState.positionY);
        }
      };
      this.handleTransformStyles = function(x, y, scale) {
        if (_this.props.customTransform) {
          return _this.props.customTransform(x, y, scale);
        }
        return getTransformStyles(x, y, scale);
      };
      this.getContext = function() {
        return getContext(_this);
      };
      this.applyTransformation = function() {
        if (!_this.mounted || !_this.contentComponent)
          return;
        var _a = _this.state, scale = _a.scale, positionX = _a.positionX, positionY = _a.positionY;
        var transform = _this.handleTransformStyles(positionX, positionY, scale);
        if (!_this.props.detached) {
          _this.contentComponent.style.transform = transform;
        }
        _this.onTransformCallbacks.forEach(function(callback) {
          return callback({
            scale,
            positionX,
            positionY,
            previousScale: _this.state.previousScale,
            ref: getContext(_this)
          });
        });
      };
      this.setState = function(scale, positionX, positionY) {
        var onTransform = _this.props.onTransform;
        if (!Number.isNaN(scale) && !Number.isNaN(positionX) && !Number.isNaN(positionY)) {
          var safeScale = Math.max(scale, 1e-7);
          if (safeScale !== _this.state.scale) {
            _this.state.previousScale = _this.state.scale;
            _this.state.scale = safeScale;
          }
          _this.state.positionX = positionX;
          _this.state.positionY = positionY;
          _this.applyTransformation();
          var ctx_1 = getContext(_this);
          _this.onChangeCallbacks.forEach(function(callback) {
            return callback(ctx_1);
          });
          handleCallback(ctx_1, { scale: _this.state.scale, positionX, positionY }, onTransform);
        } else {
          console.error("Detected NaN set state values");
        }
      };
      this.onTransform = function(callback) {
        if (!_this.onTransformCallbacks.has(callback)) {
          _this.onTransformCallbacks.add(callback);
        }
        return function() {
          _this.onTransformCallbacks.delete(callback);
        };
      };
      this.onChange = function(callback) {
        if (!_this.onChangeCallbacks.has(callback)) {
          _this.onChangeCallbacks.add(callback);
        }
        return function() {
          _this.onChangeCallbacks.delete(callback);
        };
      };
      this.onInit = function(callback) {
        if (!_this.onInitCallbacks.has(callback)) {
          _this.onInitCallbacks.add(callback);
        }
        return function() {
          _this.onInitCallbacks.delete(callback);
        };
      };
      this.init = function(wrapperComponent, contentComponent) {
        _this.cleanupWindowEvents();
        _this.wrapperComponent = wrapperComponent;
        _this.contentComponent = contentComponent;
        handleCalculateBounds(_this, _this.state.scale);
        _this.handleInitializeWrapperEvents(wrapperComponent);
        _this.handleInitialize(contentComponent);
        _this.initializeWindowEvents();
        _this.isInitialized = true;
        var ctx = getContext(_this);
        handleCallback(ctx, void 0, _this.props.onInit);
        assignRef(_this.props.ref, ctx);
      };
      this.props = props;
      this.setup = createSetup(this.props);
      this.state = createState(this.props);
    }
    return ZoomPanPinch2;
  })()
);
var Context = React$1.createContext(null);
var getContent = function(children, ctx) {
  if (typeof children === "function") {
    return children(ctx);
  }
  return children;
};
var TransformWrapper = React$1.forwardRef(function(props, ref) {
  var instance = reactExports.useRef(new ZoomPanPinch(props)).current;
  var content = getContent(props.children, getControls(instance));
  reactExports.useImperativeHandle(ref, function() {
    return getControls(instance);
  }, [instance]);
  reactExports.useEffect(function() {
    instance.update(props);
  }, [instance, props]);
  return jsxRuntimeExports.jsx(Context.Provider, __assign({ value: instance }, { children: content }));
});
React$1.forwardRef(function(props, ref) {
  var localRef = reactExports.useRef(null);
  var instance = reactExports.useContext(Context);
  reactExports.useEffect(function() {
    return instance.onChange(function(ctx) {
      if (localRef.current) {
        var positionX = 0;
        var positionY = 0;
        localRef.current.style.transform = instance.handleTransformStyles(positionX, positionY, 1 / ctx.instance.state.scale);
      }
    });
  }, [instance]);
  return jsxRuntimeExports.jsx("div", __assign({}, props, { ref: mergeRefs([localRef, ref]) }));
});
function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;
  if (typeof document === "undefined") {
    return;
  }
  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";
  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}
var css_248z = ".transform-component-module_wrapper__SPB86 {\n  position: relative;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  overflow: hidden;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none;\n  margin: 0;\n  padding: 0;\n  transform: translate3d(0, 0, 0);\n}\n.transform-component-module_content__FBWxo {\n  display: flex;\n  flex-wrap: wrap;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin: 0;\n  padding: 0;\n  transform-origin: 0% 0%;\n}\n.transform-component-module_content__FBWxo img {\n  pointer-events: none;\n}\n.transform-component-module_infiniteGrid__Z-aP3 {\n  position: absolute;\n  inset: 0;\n  pointer-events: none;\n  background-image: radial-gradient(\n    circle,\n    rgba(0, 0, 0, 0.12) 1px,\n    transparent 1px\n  );\n  background-size: 20px 20px;\n  background-position: 0 0;\n}\n";
var styles = { "wrapper": "transform-component-module_wrapper__SPB86", "content": "transform-component-module_content__FBWxo", "infiniteGrid": "transform-component-module_infiniteGrid__Z-aP3" };
styleInject(css_248z);
var TransformComponent = function(_a) {
  var children = _a.children, _b = _a.wrapperClass, wrapperClass = _b === void 0 ? "" : _b, _c = _a.contentClass, contentClass = _c === void 0 ? "" : _c, wrapperStyle = _a.wrapperStyle, contentStyle = _a.contentStyle, _d = _a.wrapperProps, wrapperProps = _d === void 0 ? {} : _d, _e = _a.contentProps, contentProps = _e === void 0 ? {} : _e, _f = _a.infinite, infinite = _f === void 0 ? false : _f;
  var instance = reactExports.useContext(Context);
  var init = instance.init, cleanupWindowEvents = instance.cleanupWindowEvents;
  var wrapperRef = reactExports.useRef(null);
  var contentRef = reactExports.useRef(null);
  var gridRef = reactExports.useRef(null);
  reactExports.useEffect(function() {
    var wrapper = wrapperRef.current;
    var content = contentRef.current;
    if (wrapper !== null && content !== null && init) {
      init === null || init === void 0 ? void 0 : init(wrapper, content);
    }
    return function() {
      cleanupWindowEvents === null || cleanupWindowEvents === void 0 ? void 0 : cleanupWindowEvents();
    };
  }, []);
  reactExports.useEffect(function() {
    if (!infinite)
      return;
    var grid = gridRef.current;
    if (!grid)
      return;
    var sync = function() {
      var _a2 = instance.state, positionX = _a2.positionX, positionY = _a2.positionY;
      grid.style.backgroundPosition = "".concat(positionX, "px ").concat(positionY, "px");
    };
    sync();
    return instance.onChange(sync);
  }, [infinite, instance]);
  return jsxRuntimeExports.jsxs("div", __assign({}, wrapperProps, { ref: wrapperRef, className: "".concat(baseClasses.wrapperClass, " ").concat(styles.wrapper, " ").concat(wrapperClass), style: wrapperStyle }, { children: [infinite && jsxRuntimeExports.jsx("div", { ref: gridRef, className: styles.infiniteGrid, "aria-hidden": true }), jsxRuntimeExports.jsx("div", __assign({}, contentProps, { ref: contentRef, className: "".concat(baseClasses.contentClass, " ").concat(styles.content, " ").concat(contentClass), style: __assign(__assign({}, contentStyle), { transform: getTransformStyles(instance.state.positionX, instance.state.positionY, instance.state.scale) }) }, { children }))] }));
};
function getOverlapArea(a, b) {
  var overlapX = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
  var overlapY = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return overlapX * overlapY;
}
function isElementVisible(opts) {
  var elementX = opts.elementX, elementY = opts.elementY, elementWidth = opts.elementWidth, elementHeight = opts.elementHeight, scale = opts.scale, positionX = opts.positionX, positionY = opts.positionY, viewportWidth = opts.viewportWidth, viewportHeight = opts.viewportHeight, _a = opts.margin, margin = _a === void 0 ? 0 : _a, _b = opts.threshold, threshold = _b === void 0 ? 0 : _b;
  var viewport = {
    x: -margin,
    y: -margin,
    width: viewportWidth + 2 * margin,
    height: viewportHeight + 2 * margin
  };
  var element = {
    x: elementX * scale + positionX,
    y: elementY * scale + positionY,
    width: elementWidth * scale,
    height: elementHeight * scale
  };
  if (threshold <= 0) {
    var intersectsX = element.x < viewport.x + viewport.width && element.x + element.width > viewport.x;
    var intersectsY = element.y < viewport.y + viewport.height && element.y + element.height > viewport.y;
    return intersectsX && intersectsY;
  }
  var elementArea = element.width * element.height;
  if (elementArea <= 0)
    return false;
  var overlap = getOverlapArea(viewport, element);
  return overlap / elementArea >= threshold;
}
React$1.forwardRef(function(_a, ref) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height, _b = _a.margin, margin = _b === void 0 ? 0 : _b, _c = _a.threshold, threshold = _c === void 0 ? 0 : _c, _d = _a.placeholder, placeholder = _d === void 0 ? null : _d, onShow = _a.onShow, onHide = _a.onHide, children = _a.children, className = _a.className, style = _a.style;
  var instance = reactExports.useContext(Context);
  var _e = reactExports.useState(false), visible = _e[0], setVisible = _e[1];
  var visibleRef = reactExports.useRef(false);
  var onShowRef = reactExports.useRef(onShow);
  var onHideRef = reactExports.useRef(onHide);
  onShowRef.current = onShow;
  onHideRef.current = onHide;
  reactExports.useEffect(function() {
    var check = function() {
      var _a2, _b2;
      var wrapper = instance.wrapperComponent;
      if (!wrapper)
        return;
      var nowVisible = isElementVisible({
        elementX: x,
        elementY: y,
        elementWidth: width,
        elementHeight: height,
        scale: instance.state.scale,
        positionX: instance.state.positionX,
        positionY: instance.state.positionY,
        viewportWidth: wrapper.offsetWidth,
        viewportHeight: wrapper.offsetHeight,
        margin,
        threshold
      });
      if (nowVisible !== visibleRef.current) {
        visibleRef.current = nowVisible;
        setVisible(nowVisible);
        if (nowVisible) {
          (_a2 = onShowRef.current) === null || _a2 === void 0 ? void 0 : _a2.call(onShowRef);
        } else {
          (_b2 = onHideRef.current) === null || _b2 === void 0 ? void 0 : _b2.call(onHideRef);
        }
      }
    };
    check();
    var unsubChange = instance.onChange(check);
    var unsubInit;
    if (!instance.wrapperComponent) {
      unsubInit = instance.onInit(function() {
        return check();
      });
    }
    return function() {
      unsubChange();
      unsubInit === null || unsubInit === void 0 ? void 0 : unsubInit();
    };
  }, [instance, x, y, width, height, margin, threshold]);
  if (!visible) {
    return placeholder ? jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: placeholder }) : null;
  }
  return jsxRuntimeExports.jsx("div", __assign({ ref, className, style }, { children }));
});
const objectPositionClass = {
  center: "object-center",
  top: "object-top",
  bottom: "object-bottom",
  "top-left": "object-left-top"
};
function CaseStudyEmbedImage({
  src,
  alt,
  objectPosition = "center",
  lightbox = false
}) {
  const posClass = objectPositionClass[objectPosition];
  const cropImgClass = cn(
    "h-full w-full object-cover",
    posClass,
    lightbox && "transition-transform duration-300 ease-out group-hover:scale-[1.015]"
  );
  if (!lightbox) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: "my-10 w-full max-w-5xl shrink-0 md:my-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-md border border-border bg-muted aspect-[16/10] md:aspect-[21/10]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src,
        alt,
        className: cropImgClass,
        loading: "lazy",
        decoding: "async"
      }
    ) }) });
  }
  const previewButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: "group block w-full cursor-zoom-in rounded-md bg-transparent p-0 text-left outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "aria-haspopup": "dialog",
      "aria-label": `Open fullscreen: ${alt}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-md border border-border bg-muted aspect-[16/10] md:aspect-[21/10]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src,
          alt: "",
          className: cropImgClass,
          loading: "lazy",
          decoding: "async",
          "aria-hidden": true
        }
      ) })
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("figure", { className: "my-10 w-full max-w-5xl shrink-0 md:my-14", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Root, { modal: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { asChild: true, children: previewButton }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Portal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Overlay,
        {
          className: cn(
            "fixed inset-0 z-[100] bg-black/65 backdrop-blur-[2px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Content,
        {
          className: cn(
            "fixed inset-0 z-[100] flex flex-col outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          ),
          onCloseAutoFocus: (e) => e.preventDefault(),
          "aria-describedby": void 0,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "sr-only", children: alt }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Close,
              {
                className: "absolute right-5 top-5 z-[110] rounded-full border border-border bg-background/95 p-2.5 text-foreground shadow-md transition-colors hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring md:right-8 md:top-8",
                "aria-label": "Close preview",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5", strokeWidth: 1.75 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-0 flex-1 flex-col pt-14 md:pt-16", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid min-h-0 flex-1 place-items-center touch-none px-2 pb-2 md:px-4 md:pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-[min(calc(100dvh-9rem),100%)] w-full max-w-[min(100vw-2rem,1920px)] items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TransformWrapper,
                {
                  initialScale: 1,
                  minScale: 0.35,
                  maxScale: 12,
                  centerOnInit: true,
                  centerZoomedOut: true,
                  wheel: {
                    step: 0.12,
                    wheelDisabled: false
                  },
                  pinch: {
                    step: 12
                  },
                  doubleClick: {
                    disabled: false,
                    mode: "reset"
                  },
                  panning: {
                    velocityDisabled: false
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TransformComponent,
                    {
                      wrapperClass: "flex h-full w-full items-center justify-center",
                      contentClass: "flex !h-full !w-full items-center justify-center [&>img]:mx-auto [&>img]:my-auto",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src,
                          alt,
                          className: "max-h-[min(calc(100dvh-9rem),90vh)] w-auto max-w-full select-none object-contain",
                          draggable: false
                        }
                      )
                    }
                  )
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pointer-events-none px-4 pb-3 text-center text-xs text-muted-foreground md:text-sm", children: "두 손가락으로 확대/축소 · 마우스 드래그로 이동 · 휠로 확대 · 더블클릭으로 초기화" })
            ] })
          ]
        }
      )
    ] })
  ] }) });
}
const scaffoldSections = [
  { num: "01", label: "Overview", id: "overview" },
  { num: "02", label: "Opportunities", id: "opportunities" },
  { num: "03", label: "User Research", id: "user-research" },
  { num: "04", label: "Findings & Starting Point", id: "findings" },
  { num: "05", label: "Brand Guidelines", id: "brand-guidelines" },
  { num: "06", label: "Lo-fis & Hi-fis", id: "lo-fis-hi-fis" },
  { num: "07", label: "Key Features", id: "key-features" },
  { num: "08", label: "Print Design", id: "print-design" },
  { num: "09", label: "Product Storytelling", id: "product-storytelling" },
  { num: "10", label: "Promotional Video", id: "promotional-video" },
  {
    num: "11",
    label: "Learning Outcomes & Next Steps",
    id: "learning-outcomes"
  }
];
function SectionNav({
  sections,
  revealAfterSelector,
  hideWhenPastSelector
}) {
  const hideSelector = hideWhenPastSelector?.trim() ?? "";
  const [scrollFactor, setScrollFactor] = reactExports.useState(0);
  const [nextOverlapEase, setNextOverlapEase] = reactExports.useState(1);
  const dockReveal = scrollFactor * nextOverlapEase;
  const [activeId, setActiveId] = reactExports.useState(sections[0]?.id ?? "");
  reactExports.useEffect(() => {
    if (!hideSelector) {
      setNextOverlapEase(1);
      return;
    }
    const endEl = document.querySelector(hideSelector);
    if (!endEl) {
      setNextOverlapEase(1);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          setNextOverlapEase(1);
          return;
        }
        let r = entry.intersectionRatio;
        if (r <= 1e-4 && entry.boundingClientRect.height > 0) {
          const vh = window.innerHeight;
          const t = entry.boundingClientRect.top;
          const b = entry.boundingClientRect.bottom;
          const vis = Math.max(0, Math.min(b, vh) - Math.max(0, t));
          r = vis / Math.max(1, entry.boundingClientRect.height);
        }
        const ease = Math.max(0, 1 - Math.min(1, r * 4.5));
        setNextOverlapEase(ease);
      },
      {
        root: null,
        threshold: Array.from({ length: 41 }, (_, i) => i / 40)
      }
    );
    observer.observe(endEl);
    return () => observer.disconnect();
  }, [hideSelector]);
  reactExports.useEffect(() => {
    const revealEl = document.querySelector(revealAfterSelector);
    if (!revealEl) return;
    const onScroll = () => {
      const revealRect = revealEl.getBoundingClientRect();
      const pastIntro = revealRect.bottom <= 80;
      const ih = window.innerHeight;
      const docEl = document.documentElement;
      const body = document.body;
      const scrollHeight = Math.max(
        docEl.scrollHeight,
        body.scrollHeight,
        docEl.offsetHeight,
        body.offsetHeight
      );
      const scrollBottom = window.scrollY + ih;
      const atDocumentBottom = scrollBottom >= scrollHeight - Math.max(120, ih * 0.1);
      let factor = 0;
      if (!pastIntro) {
        factor = 0;
      } else if (!hideWhenPastSelector) {
        factor = 1;
      } else if (atDocumentBottom) {
        factor = 0;
      } else {
        const endEl = document.querySelector(hideWhenPastSelector);
        if (!endEl) {
          factor = 1;
        } else {
          const rect = endEl.getBoundingClientRect();
          const top = rect.top;
          const bottom = rect.bottom;
          const blockMostlyPassed = bottom < ih * 0.12;
          const bandHi = ih * 0.78;
          const bandLo = ih * 0.42;
          if (top >= bandHi && !blockMostlyPassed) {
            factor = 1;
          } else if (top <= bandLo || blockMostlyPassed) {
            factor = 0;
          } else {
            const u = (top - bandLo) / (bandHi - bandLo);
            factor = u * u * (3 - 2 * u);
          }
        }
      }
      setScrollFactor(factor);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [revealAfterSelector, hideWhenPastSelector]);
  reactExports.useEffect(() => {
    const elements = sections.map((s) => document.getElementById(s.id)).filter((el) => !!el);
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visibleEntries[0]) setActiveId(visibleEntries[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": "Section navigation",
      style: {
        opacity: dockReveal,
        transform: `translateY(-50%) translateX(${-18 * (1 - dockReveal)}px)`,
        pointerEvents: dockReveal > 0.08 ? "auto" : "none"
      },
      className: "group/nav fixed left-0 top-1/2 z-40 hidden w-fit max-w-full pl-6 pr-6 transition-[opacity,transform] duration-700 ease-in-out motion-reduce:transition-none lg:inline-block md:pl-10",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "w-fit space-y-3 font-mono text-xs uppercase tracking-[0.2em]", children: sections.map((s) => {
        const isActive = activeId === s.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `#${s.id}`,
            className: `group flex items-start gap-3 pe-8 leading-[1.5] py-1 -my-1 transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/40 hover:text-foreground/80"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `mt-[0.55em] h-px transition-all duration-500 ease-out ${isActive ? "w-8 bg-accent" : "w-4 bg-foreground/30 group-hover/nav:w-3"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-accent transition-all duration-500 ease-out ${isActive ? "opacity-100" : "opacity-60 group-hover/nav:opacity-100"}`,
                  children: s.num
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block max-w-4 overflow-hidden shrink-0 transition-[max-width] duration-200 ease-out group-hover/nav:max-w-48 group-hover/nav:duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block min-w-[12rem] w-48 whitespace-normal transition-[transform,opacity] duration-500 ease-out -translate-x-6 opacity-0 group-hover/nav:translate-x-0 group-hover/nav:opacity-100 will-change-transform", children: s.label }) })
            ]
          }
        ) }, s.id);
      }) })
    }
  );
}
function formatInlineBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-foreground", children: part.slice(2, -2) }, i);
    }
    return part;
  });
}
function isNumberedBulletLine(para) {
  return /^\d+\.\s/.test(para) || /^\*\*\d+\.\s/.test(para);
}
function groupParagraphRuns(paragraphs) {
  const groups = [];
  for (const para of paragraphs) {
    const numbered = isNumberedBulletLine(para);
    const prev = groups[groups.length - 1];
    if (prev && prev.numbered === numbered) {
      prev.items.push(para);
    } else {
      groups.push({
        numbered,
        items: [para]
      });
    }
  }
  return groups;
}
function formatStatNumber(value) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}
function AnimatedStatNumber({
  value,
  suffix,
  delay = 0,
  active
}) {
  const [text, setText] = reactExports.useState("0");
  reactExports.useEffect(() => {
    if (!active) return;
    const decimals = Number.isInteger(value) ? 0 : 1;
    const controls = animate$1(0, value, {
      delay,
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        const n = decimals === 0 ? Math.round(latest) : Math.round(latest * 10) / 10;
        setText(formatStatNumber(n));
      }
    });
    return () => controls.stop();
  }, [value, delay, active]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
    text,
    suffix
  ] });
}
function StatHeadline({
  stat,
  delay,
  active
}) {
  const hasSubline = stat.headlineBottom != null && stat.headlineBottom !== "";
  const topSuffix = hasSubline ? stat.suffix ?? "" : stat.suffix ?? "%";
  if (hasSubline) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-start gap-2 leading-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedStatNumber, { value: stat.value, suffix: topSuffix, delay, active }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { className: "block", initial: {
        opacity: 0,
        y: 10
      }, animate: active ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 10
      }, transition: {
        duration: 0.5,
        delay: delay + 0.15,
        ease: [0.22, 1, 0.36, 1]
      }, children: stat.headlineBottom })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedStatNumber, { value: stat.value, suffix: topSuffix, delay, active });
}
function CaseStudyStatsRow({
  stats,
  tightBottom = false
}) {
  const ref = reactExports.useRef(null);
  const inView2 = useInView(ref, {
    once: true,
    amount: 0.35
  });
  const padding = tightBottom ? "pt-10 pb-4 sm:pt-14 sm:pb-5 md:pt-16 md:pb-6" : "py-10 sm:py-14 md:py-16";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: `grid w-full max-w-5xl grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 md:gap-12 ${padding}`, children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-item flex min-w-0 flex-col gap-3 text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-semibold leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatHeadline, { stat, delay: i * 0.12, active: inView2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg leading-relaxed text-foreground/85", children: formatInlineBold(stat.label) })
  ] }, i)) });
}
function renderCaseStudyBlocks(blocks) {
  const out = [];
  let stringRun = [];
  let key = 0;
  const flushStrings = () => {
    if (stringRun.length === 0) return;
    const groups = groupParagraphRuns(stringRun);
    for (const group of groups) {
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: group.numbered ? "space-y-1.5" : "space-y-5", children: group.items.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatInlineBold(para) }, i)) }, `cs-${key++}`));
    }
    stringRun = [];
  };
  for (const block of blocks) {
    if (typeof block === "string") {
      stringRun.push(block);
    } else if ("vspace" in block && block.vspace === true) {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 shrink-0 md:h-4", "aria-hidden": true }, `cs-${key++}`));
    } else if ("highlight" in block && typeof block.highlight === "string" && block.highlight.length > 0) {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-lg leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-sm bg-accent px-0.5 py-0.5 font-semibold text-accent-foreground [box-decoration-break:clone] md:px-1 md:py-1 [&_strong]:text-accent-foreground", children: formatInlineBold(block.highlight) }) }, `cs-${key++}`));
    } else if ("image" in block && block.image && typeof block.image.src === "string" && typeof block.image.alt === "string") {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyEmbedImage, { src: block.image.src, alt: block.image.alt, objectPosition: block.image.objectPosition, lightbox: block.image.lightbox === true }, `cs-${key++}`));
    } else if ("ul" in block && Array.isArray(block.ul)) {
      flushStrings();
      out.push(/* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-2 pl-6 marker:text-foreground/70", children: block.ul.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: formatInlineBold(item) }, i)) }, `cs-${key++}`));
    } else if ("stats" in block && Array.isArray(block.stats)) {
      flushStrings();
      const after = "afterStats" in block && typeof block.afterStats === "string" && block.afterStats.length > 0 ? block.afterStats : null;
      if (after) {
        out.push(/* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyStatsRow, { stats: block.stats, tightBottom: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-3xl text-lg leading-relaxed text-foreground/85", children: formatInlineBold(after) })
        ] }, `cs-${key++}`));
      } else {
        out.push(/* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudyStatsRow, { stats: block.stats }, `cs-${key++}`));
      }
    }
  }
  flushStrings();
  return out;
}
function CaseStudySectionBody({
  sectionId,
  project
}) {
  if (sectionId === "overview") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 text-lg leading-relaxed text-foreground/85 max-w-3xl", children: project.overview?.map((para, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: formatInlineBold(para) }, i)) });
  }
  const blocks = project.caseStudySections?.[sectionId];
  if (blocks?.length) {
    const hasStatsRow = blocks.some((b) => typeof b === "object" && b !== null && "stats" in b);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `space-y-5 text-lg leading-relaxed text-foreground/85 ${hasStatsRow ? "max-w-5xl" : "max-w-3xl"}`, children: renderCaseStudyBlocks(blocks) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-foreground/60 max-w-3xl", children: "Content coming soon!" });
}
function ProjectPage() {
  const project = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Nav, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionNav, { sections: scaffoldSections, revealAfterSelector: "#intro-visuals", hideWhenPastSelector: "#next-project" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "px-6 md:px-10 pt-32 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", hash: "work", className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " All work"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }, className: "font-display text-[clamp(3rem,10vw,9rem)] font-semibold leading-[0.95] tracking-tight", children: project.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        duration: 0.6,
        delay: 0.3
      }, className: "mt-6 max-w-2xl text-lg md:text-xl text-foreground/70", children: project.summary })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "intro-visuals", className: "px-6 md:px-10 pb-24 md:pb-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1440px] grid gap-4 sm:grid-cols-2", children: [0, 1, 2, 3].map((i) => {
      const tile = project.introVisuals?.[i];
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-[4/3] overflow-hidden rounded-md border border-border ${tile ? "bg-muted" : "flex items-center justify-center bg-secondary"}`, children: tile ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: tile.src, alt: tile.alt, className: "h-full w-full object-cover", loading: "lazy", decoding: "async" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        "Visual ",
        i + 1
      ] }) }, i);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 md:px-10 pb-24 md:pb-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1440px] lg:pl-64 space-y-24 md:space-y-32", children: scaffoldSections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: s.id, className: "scroll-mt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: s.num }),
        "   ",
        s.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-5xl font-medium tracking-tight mb-6", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CaseStudySectionBody, { sectionId: s.id, project })
    ] }, s.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "next-project", className: "border-t border-border/70 px-6 md:px-10 py-16 md:py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1440px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6", children: "Next project" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/work/$slug", params: {
        slug: next.slug
      }, className: "group flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-4xl md:text-7xl font-medium tracking-tight transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent", children: next.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-6 w-6 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent", strokeWidth: 1.5 })
      ] })
    ] }) })
  ] });
}
export {
  ProjectPage as component
};
