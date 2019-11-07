import React, { Component } from 'react';
import { Stage, Layer, Line, Circle, Text, Rect } from 'react-konva';
import { flatten, filter, contains, without } from 'ramda';

import { LINES, CONNECTORS } from './constants/lines';
import { RIVER, HOLES } from './constants/river';

export default class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stageScale: props.initialScale || 1,
            stageX: 0,
            stageY: 0,
            checked: props.value || []
        };
    }

    handleWheel = e => {
        e.evt.preventDefault();

        const scaleBy = 1.01;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });
        this.setState({
            stageScale: newScale,
            stageX: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    };

    checkStation = (id, checkConnectors) => {
        this.setState(prev => {
            const { onChange } = this.props;
            const ids = [id, ...(checkConnectors || [])];
            const checked = contains(id, prev.checked) ? without(ids, prev.checked) : prev.checked.concat(ids);

            onChange && onChange(checked);

            return { checked };
        });
    }

    renderText = station => {
        const textWidth = station.textWidth || 130;
        const width = contains(station.id, this.state.checked) ? textWidth + 10 : textWidth;
        const left = /left/gi.test(station.textPosition || '');
        const bottom = /bottom/gi.test(station.textPosition || '');
        const top = /top/gi.test(station.textPosition || '');

        return <Text
            key={`line-station-text-${station.id}`}
            text={station.name}
            align={station.textCenter ? 'center' : (/left/gi.test(station.textPosition || '') ? 'right' : 'left')}
            x={station.textCenter ? (station.x - width / 2) : station.x}
            y={station.y}
            offsetX={(left ? (width + 10) : -13) + (station.extraX || 0)}
            offsetY={(bottom ? (left ? -5 : -10) : top ? 17 : 6) + (station.extraY || 0)}
            width={width}
            fontStyle={contains(station.id, this.state.checked) ? 'bold' : 'normal'}
            fontSize={14}
            onClick={() => this.checkStation(station.id, station.checkConnectors)}
            onMouseEnter={() => document.body.style.cursor = 'pointer'}
            onMouseLeave={() => document.body.style.cursor = 'grab'} />;
    }

    render() {
        return <Stage
            width={1000}
            height={1329}
            onWheel={this.handleWheel}
            scaleX={this.state.stageScale}
            scaleY={this.state.stageScale}
            x={this.state.stageX}
            y={this.state.stageY}
            onMouseEnter={() => document.body.style.cursor = 'grab'}
            draggable>
            <Layer>
                <Line
                    x={0}
                    y={0}
                    points={RIVER}
                    tension={.3}
                    closed
                    fill='#DEF1F6' />
                { HOLES.map((hole, index) =>
                    <Line
                        key={`river-hole-${index}`}
                        x={0}
                        y={0}
                        points={hole}
                        tension={.3}
                        closed
                        fill='#fff' />
                )}
                { LINES.map(line =>
                    <Line
                        key={`line-${line.type}`}
                        x={0}
                        y={0}
                        points={flatten(line.stations.map(({ x, y }) => ([x, y])))}
                        tension={.3}
                        stroke={line.color}
                        strokeWidth={5}
                    />
                )}
                { LINES.map(line =>
                    filter(({ helpful }) => !helpful, line.stations).map(station =>
                        <Circle
                            key={`line-station-${station.id}`}
                            x={station.x}
                            y={station.y}
                            radius={station.transfer ? 7 : 4}
                            stroke={line.color}
                            strokeWidth={station.transfer ? 4 : 3}
                            fill='#fff'/>
                    )
                )}
                { CONNECTORS.map((connector, index) =>
                    <Line
                        key={`connector-${index}`}
                        x={0}
                        y={0}
                        stroke='#fff'
                        strokeWidth={3}
                        closed
                        points={connector} />
                )}
                { LINES.map(line =>
                    filter(({ helpful, id }) => !helpful && contains(id, this.state.checked), line.stations).map(station =>
                        <Circle
                            key={`line-station-checked-${station.id}`}
                            x={station.x}
                            y={station.y}
                            radius={9}
                            fill='#6AC259'
                            shadowColor='#bcbcbc'
                            shadowBlur={3} />
                    )
                )}
                { LINES.map(line =>
                    filter(({ helpful, id }) => !helpful && contains(id, this.state.checked), line.stations).map(station =>
                        <Line
                            key={`line-station-checked-icon-${station.id}`}
                            x={station.x}
                            y={station.y}
                            points={[-5, -1, -1.5, 3, 4.5, -3]}
                            stroke='#fff'
                            strokeWidth={2} />
                    )
                )}
                { LINES.map(line => filter(({ helpful, hideText }) => !helpful && !hideText, line.stations).map(this.renderText))}
                { LINES.map(line =>
                    filter(({ helpful }) => !helpful, line.stations).map(station =>
                        <Circle
                            key={`line-station-clickable-${station.id}`}
                            x={station.x}
                            y={station.y}
                            radius={9}
                            onClick={() => this.checkStation(station.id, station.checkConnectors)}
                            onMouseEnter={() => document.body.style.cursor = 'pointer'}
                            onMouseLeave={() => document.body.style.cursor = 'grab'} />
                    )
                )}
                { LINES.map(line =>
                    line.hideStartNumber ? null :
                        <Circle
                            key={`line-start-number-circle-${line.type}`}
                            x={line.stations[0].x}
                            y={line.stations[0].y - 25}
                            stroke={line.color}
                            strokeWidth={1}
                            radius={9} />
                )}
                { LINES.map((line, index) =>
                    line.hideStartNumber ? null :
                        <Text
                            key={`line-start-number-${line.type}`}
                            x={line.stations[0].x - 3}
                            y={line.stations[0].y - 30}
                            fontStyle='bold'
                            fill={line.color}
                            text={index + 1} />
                )}
                { LINES.map((line, index) =>
                    line.hideEndNumber ? null :
                        <Circle
                            key={`line-end-number-circle-${line.type}`}
                            x={line.stations[line.stations.length - 1].x}
                            y={line.stations[line.stations.length - 1].y + 25}
                            stroke={line.color}
                            strokeWidth={1}
                            radius={9} />
                )}
                { LINES.map((line, index) =>
                    line.hideEndNumber ? null :
                        <Text
                            key={`line-end-number-${line.type}`}
                            x={line.stations[line.stations.length - 1].x - 3}
                            y={line.stations[line.stations.length - 1].y + 20}
                            fontStyle='bold'
                            fill={line.color}
                            text={index + 1} />
                )}
            </Layer>
            <Layer>
                <Text
                    x={850}
                    y={175}
                    fontStyle='bold'
                    fontSize={14}
                    text='Линии метро' />
                { LINES.map((line, index) =>
                    <Text
                        key={`line-title-${index}`}
                        x={850}
                        y={200 + 23 * index}
                        fontSize={14}
                        text={line.name} />
                )}
                <Text
                    x={850}
                    y={320}
                    fontSize={14}
                    text='Станции пересадок' />
                { LINES.map((line, index) =>
                    <Rect
                        key={`line-title-rect-${index}`}
                        x={810}
                        y={204 + 23 * index}
                        fontSize={14}
                        width={33}
                        height={5}
                        fill={line.color} />
                )}
                { LINES.map((line, index) =>
                    <Text
                        key={`line-title-num-${index}`}
                        x={791}
                        y={201 + 23 * index}
                        fontStyle='bold'
                        fill={line.color}
                        text={index + 1} />
                )}
                { LINES.map((line, index) =>
                    <Circle
                        key={`line-title-num-circle-${index}`}
                        x={794}
                        y={206 + 23 * index}
                        strokeWidth={1}
                        stroke={line.color}
                        radius={9} />
                )}
                <Circle
                    x={835}
                    y={326}
                    strokeWidth={4}
                    stroke='#652C91'
                    radius={7} />
                <Circle
                    x={817}
                    y={326}
                    strokeWidth={4}
                    stroke='#ED0004'
                    radius={7} />
                <Line
                    fill
                    x={0}
                    y={0}
                    points={[835, 326, 817, 326]}
                    stroke='#fff'
                    strokeWidth={3} />
            </Layer>
        </Stage>;
    }
}
