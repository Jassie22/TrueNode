/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace React {
  interface CSSProperties {
    [key: string]: any;
  }
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: any;
  export default content;
}

declare module "gsap" {
  export function to(
    targets: any,
    vars: any
  ): any;
  
  export function from(
    targets: any,
    vars: any
  ): any;
  
  export function fromTo(
    targets: any,
    fromVars: any,
    toVars: any
  ): any;
  
  export function timeline(config?: any): any;
  
  export function registerPlugin(...args: any[]): void;

  export const ScrollTrigger: any;
}

declare module "gsap/ScrollTrigger" {
  export const ScrollTrigger: any;
  export default ScrollTrigger;
} 