import React from 'react';
import {Slider, FormLayoutGroup} from "@vkontakte/vkui";


class Secret extends React.Component {
    state = {value: 0}

    render() {
        return (

                <FormLayoutGroup top="Value [0, 5]">
                    <Slider
                        step={1}
                        min={0}
                        max={5}
                        value={Number(this.state.value)}
                        onChange={value => this.setState({value})}
                    />
                    <span>{this.state.value * this.state.value}</span>
                </FormLayoutGroup>
        );
    }
}


export default Secret;
