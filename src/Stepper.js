import React from "react";
import styled from "styled-components";

const A = {};

A.Container = styled.div`
  --active: #17c671;
  --markers: #979797;
  --font-family: "San Francisco";
  --background: #eceeef;
  --indicator: #007bff;
  --border-radius: 16px;
  --height: 7px;
  --progress: ${props => props.progress || 0}%;

  font-family: var(--font-family);
`;

A.Progress = styled.div`
  color: var(--color);
  background: var(--background);
  box-shadow: inset 0 1px 2px 0 rgba(90, 97, 105, 0.1);

  border-radius: var(--border-radius);

  height: var(--height);
`;

A.Indicator = styled.div`
  color: #fff;
  background-color: var(--indicator);

  border-radius: var(--border-radius);
  width: var(--progress);
  height: var(--height);
`;

A.ItemContainer = styled.div`
  display: flex;

  align-items: flex-start;

  height: 39px;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 10px;
    height: 10px;
    width: 100%;
    border-right: 1px solid var(--markers);
  }
`;

const active = ({ isActive }) =>
  isActive ? `color: var(--active); font-weight: 500;` : null;

const current = ({ isCurrent }) =>
  isCurrent ? `font-weight: 500;` : `color: #5A6169;`;

A.Item = styled.div`
  ${current}
  ${active}

  letter-spacing: -0.54px;
  font-size: 15px;
  text-align: center;
  flex: 1;

  padding-top: 2px;

  height: 100%;

  user-select: none;
  cursor: pointer;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 10px;
    height: 10px;
    width: 100%;
    border-left: 1px solid var(--markers);
  }
`;

const lerp = (x, y, a) => x * (1 - a) + y * a;
const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));
const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));

const Stepper = ({ className, steps, current, onItemClick }) => (
  <A.Container
    className={className}
    progress={range(0, steps.length, 0, 100, current + 0.5)}
  >
    <A.ItemContainer>
      {steps.map((v, i) => (
        <A.Item
          key={i}
          isActive={current > i}
          isCurrent={i === current}
          onClick={() => onItemClick(i)}
        >
          {v}
        </A.Item>
      ))}
    </A.ItemContainer>
    <A.Progress>
      <A.Indicator />
    </A.Progress>
  </A.Container>
);

export default Stepper;
