import { useRef, useEffect } from "react";

const PianoRoll = ({ sequence }) => {
  const svgRef = useRef(null);

  function generateGradientTable(startColor, endColor, steps) {
    const gradientTable = [];
    for (let i = 0; i < steps; i += 1) {
      const r = startColor.r + ((endColor.r - startColor.r) * i) / (steps - 1);
      const g = startColor.g + ((endColor.g - startColor.g) * i) / (steps - 1);
      const b = startColor.b + ((endColor.b - startColor.b) * i) / (steps - 1);
      gradientTable.push(
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
      );
    }
    return gradientTable;
  }

  useEffect(() => {
    if (!sequence) {
      return;
    }
    const svgElement = svgRef.current;

    const backgroundStartColor = { r: 93, g: 181, b: 213 };
    const backgroundEndColor = { r: 21, g: 65, b: 81 };
    const backgroundColormap = generateGradientTable(
      backgroundStartColor,
      backgroundEndColor,
      128
    );

    const noteStartColor = { r: 66, g: 66, b: 61 };
    const noteEndColor = { r: 28, g: 28, b: 26 };
    const noteColormap = generateGradientTable(
      noteStartColor,
      noteEndColor,
      128
    );

    let start = sequence[0].start;
    let end = sequence[sequence.length - 1].end - start;

    const timeToX = (time) => {
      return time / end;
    };

    const drawEmptyPianoRoll = (minPitch, maxPitch) => {
      while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
      }

      const pitchSpan = maxPitch - minPitch;

      for (let it = minPitch; it <= maxPitch; it += 1) {
        const isBlackKey = [1, 3, 6, 8, 10].includes(it % 12);
        if (isBlackKey) {
          const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
          );
          const y = 1 - (it - minPitch) / pitchSpan;
          const x = 0;
          const h = 1 / pitchSpan;
          const w = 1;

          rect.setAttribute("fill", backgroundColormap[12]);
          rect.setAttribute("fill-opacity", "0.666");
          rect.setAttribute("x", `${x}`);
          rect.setAttribute("y", `${y}`);
          rect.setAttribute("width", `${w}`);
          rect.setAttribute("height", `${h}`);
          svgElement.appendChild(rect);
        }

        var line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        const y = 1 - (it - minPitch) / pitchSpan + 1 / pitchSpan;
        line.setAttribute("x1", "0");
        line.setAttribute("y1", `${y}`);
        line.setAttribute("x2", "2");
        line.setAttribute("y2", `${y}`);

        let lineWidth;
        if (it % 12 === 0) {
          lineWidth = 0.003;
        } else {
          lineWidth = 0.001;
        }
        line.setAttribute("stroke-width", `${lineWidth}`);
        line.setAttribute("stroke", "black");
        svgElement.appendChild(line);
      }
    };

    const drawPianoRoll = (sequence) => {
      const pitches = sequence.map((note) => note.pitch);

      let minPitch = Math.min(...pitches);
      let maxPitch = Math.max(...pitches);
      let pitchSpan = maxPitch - minPitch;

      if (pitchSpan < 24) {
        const diff = 24 - pitchSpan;
        const low = Math.ceil(diff / 2);
        const high = Math.floor(diff / 2);
        minPitch -= low;
        maxPitch += high;
      }
      minPitch -= 3;
      maxPitch += 3;
      pitchSpan = maxPitch - minPitch;
      const noteHeight = 1 / pitchSpan;

      drawEmptyPianoRoll(minPitch, maxPitch);

      sequence.forEach((note) => {
        const noteRectangle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );

        const x = timeToX(note.start - start);
        const w = timeToX(note.end - note.start);
        const y = 1 - (note.pitch - minPitch) / pitchSpan;

        noteRectangle.setAttribute("x", `${x}`);
        noteRectangle.setAttribute("width", `${w}`);
        noteRectangle.setAttribute("y", `${y}`);
        noteRectangle.setAttribute("height", `${noteHeight}`);

        const color = noteColormap[note.velocity];
        noteRectangle.setAttribute("fill", color);
        noteRectangle.classList.add("note-rectangle");

        svgElement.appendChild(noteRectangle);
      });
    };

    drawPianoRoll(sequence);
  }, [sequence]);

  return (
    <svg
      ref={svgRef}
      className="piano-roll-svg"
      width="80%"
      height="150"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
    />
  );
};

export default PianoRoll;
