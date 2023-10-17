"use client";

import { usePathname } from "next/navigation";
import {
  TransitionGroup,
  Transition as ReactTransition,
  TransitionStatus,
} from "react-transition-group";

const TIMEOUT: number = 200;

const getTransitionStyles: Record<TransitionStatus, any> = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
    animation: "blink .3s linear 2",
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-50px)`,
  },
  exited: {},
  unmounted: {},
};

type Props = {
  children: React.ReactNode;
};

export default function Transition({ children }: Props) {
  const pathname = usePathname();
  return (
    <TransitionGroup style={{ position: "relative" }}>
      <ReactTransition
        key={pathname}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <div
            style={{
              ...getTransitionStyles[status],
            }}
          >
            {children}
          </div>
        )}
      </ReactTransition>
    </TransitionGroup>
  );
}
