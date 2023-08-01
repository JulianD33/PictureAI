import React from 'react';
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadBigCirclesPreset } from "tsparticles-preset-big-circles";

export class Design2 extends React.PureComponent<IProps> {
  // this customizes the component tsParticles installation
  async customInit(engine: Engine): Promise<void> {
    // this adds the preset to tsParticles, you can safely use the
    await loadBigCirclesPreset(engine);
  }

  render() {
    const options = {
      preset: "bigCircles",
      background: "linear-gradient(89deg, #FF5EDF 0%, #04C8DE 100%)" // also "big-circles" is accepted
    };

    return <Particles options={options} init={this.customInit} />;
  }
}

export default Design2