(function () {
    'use strict';

    function toRect(r, theta) {
        return r * Math.cos(theta) + ',' + r * Math.sin(theta) + ' ';
    }

    function toRectCoord(r, theta) {
        return {x: r * Math.cos(theta), y: r * Math.sin(theta)};
    }

    var r = 256, inner = 0.82, b = r * 0.1, round = r * 0.09, width = r * 0.22, distance = width * 1.25, pull = 0.5,
        path, i, angle, points, sign, controlPoint, otherPoint, point, ringGroup, barsGroup, ring, mainGroup,
        bars = [{id: 0, length: 0.35}, {id: 1, length: 0.7}, {id: 2, length: 1.1}, {id: 3, length: 0.7}, {id: 4, length: 0.35}],
        animate = false, cleanLogo = false;

    bars.forEach(function (d) {
        d.origLength = d.length;
    });

    mainGroup = d3.select('.logo')
        .attr('width', 2.5 * r + 'px')
        .attr('height', 2.5 * r + 'px')
        .append('g')
        .attr('transform', 'translate(' + 1.25 * r + ',' + 1.25 * r + ')');

    ringGroup = mainGroup.append('g');

    barsGroup = mainGroup.append('g');

    ring = ringGroup.append('path')
        .attr('fill', '#166DB7');

    function drawLogo() {
        // Outer ring
        path = 'M' + toRect(r, -Math.PI / 16);
        for (i = 0; i < 16; i += 1) {
            angle = i * Math.PI / 8;
            path += 'C';
            if (i % 2) {
                controlPoint = toRectCoord(r + b, angle - Math.PI / 8 + pull * Math.PI / 16);
                otherPoint = toRectCoord(r, angle - Math.PI / 8 + Math.PI / 16);
                path += (otherPoint.x + otherPoint.x - controlPoint.x) + ',' + (otherPoint.y + otherPoint.y - controlPoint.y) + ' ';

                controlPoint = toRectCoord(r + b, angle + Math.PI / 8 - pull * Math.PI / 16);
                otherPoint = toRectCoord(r, angle + Math.PI / 16);
                path += (otherPoint.x + otherPoint.x - controlPoint.x) + ',' + (otherPoint.y + otherPoint.y - controlPoint.y) + ' ';
            } else {
                path += toRect(r + b, angle - pull * Math.PI / 16);
                path += toRect(r + b, angle + pull * Math.PI / 16);
            }
            path += toRect(r, angle + Math.PI / 16);
        }
        path += 'z';

        // Inner ring (hole)
        path += 'M' + toRect(inner * r, Math.PI / 16);
        for (i = 0; i < 16; i += 1) {
            angle = 2 * Math.PI - i * Math.PI / 8;
            path += 'C';
            if (i % 2) {
                controlPoint = toRectCoord(inner * (r + b), angle + Math.PI / 8 - pull * Math.PI / 16);
                otherPoint = toRectCoord(inner * r, angle + Math.PI / 16);
                path += (otherPoint.x + otherPoint.x - controlPoint.x) + ',' + (otherPoint.y + otherPoint.y - controlPoint.y) + ' ';

                controlPoint = toRectCoord(inner * (r + b), angle - Math.PI / 8 + pull * Math.PI / 16);
                otherPoint = toRectCoord(inner * r, angle - Math.PI / 8 + Math.PI / 16);
                path += (otherPoint.x + otherPoint.x - controlPoint.x) + ',' + (otherPoint.y + otherPoint.y - controlPoint.y) + ' ';
            } else {
                path += toRect(inner * (r + b), angle + pull * Math.PI / 16);
                path += toRect(inner * (r + b), angle - pull * Math.PI / 16);
            }
            path += toRect(inner * r, angle - Math.PI / 16);
        }
        path += 'z';

        ring.transition().duration(150).attr('d', path);

        var barRects = barsGroup.selectAll('rect').data(bars, function (d) { return d.id; });
        barRects.enter().append('rect')
            .attr('fill', function (d, i) { return i % 2 ? '#00A14B' : '#8EC13F'; })
            .attr('rx', round)
            .attr('ry', round)
            .attr('x', function (d, i) { return i * distance - 2 * distance - width / 2; })
            .attr('width', width)
            .attr('y', function (d, i) { return -r * d.length / 2; })
            .attr('height', function (d, i) { return r * d.length; });
        barRects.transition().duration(150)
            .attr('rx', round)
            .attr('ry', round)
            .attr('x', function (d, i) { return i * distance - 2 * distance - width / 2; })
            .attr('width', width)
            .attr('y', function (d, i) { return -r * d.length / 2; })
            .attr('height', function (d, i) { return r * d.length; });
    }

    $('.logo').on('mouseover', function () {
        animate = true;
    });
    $('.logo').on('mouseout', function () {
        animate = false;
    });
    $('.tell-me-more').on('mouseover', function () {
        animate = true;
    });
    $('.tell-me-more').on('mouseout', function () {
        animate = false;
    });
    redraw();

    function redraw() {
        if (animate) {
            cleanLogo = false;
            bars.forEach(function (d) {
                d.length = (0.3 + Math.random()) * d.origLength;
            });
            r = 200 + 50 * Math.random();
            inner = 0.8 + 0.1 * Math.random();
            b = r * (0.2 + 0.1 * Math.random());
            round = r * 0.09;
            width = r * 0.22;
            distance = width * 1.25;
            pull = Math.random();
            drawLogo();
        } else {
            bars.forEach(function (d) {
                d.length = d.origLength;
            });
            r = 256;
            inner = 0.82;
            b = r * 0.1;
            round = r * 0.09;
            width = r * 0.22;
            distance = width * 1.25;
            pull = 0.5;
            if (!cleanLogo) {
                cleanLogo = true;
                drawLogo();
            }
        }
        setTimeout(redraw, 150);
    }
}());
