import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PianoRollSvg } from "./PianoRoll.styled";

const PianoRoll = ({ sequence, page = "home" }) => {
  const svgRef = useRef(null);
  const [selection, setSelection] = useState({
    isSelecting: false,
    startX: 0,
    endX: 0,
  });
  const [selectedRange, setSelectedRange] = useState(null);

  const generateGradientTable = (startColor, endColor, steps) => {
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
  };

  useEffect(() => {
    if (!sequence) {
      return;
    }
    const svgElement = svgRef.current;
    const svgRect = svgElement.getBoundingClientRect();
    const backgroundColormap = generateGradientTable(
      { r: 93, g: 181, b: 213 },
      { r: 21, g: 65, b: 81 },
      128
    );
    const noteColormap = generateGradientTable(
      { r: 66, g: 66, b: 61 },
      { r: 28, g: 28, b: 26 },
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

        const line = document.createElementNS(
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

    const handleMouseDown = (e) => {
      if (e.target === svgElement) {
        const startX = (e.clientX - svgRect.left) / svgRect.width;
        setSelection({ isSelecting: true, startX, endX: startX });
      }
    };

    const handleMouseMove = (e) => {
      if (selection.isSelecting) {
        const endX = (e.clientX - svgRect.left) / svgRect.width;
        setSelection({ ...selection, endX });
      }
    };

    const handleMouseUp = () => {
      if (selection.isSelecting) {
        const startX = Math.min(selection.startX, selection.endX);
        const endX = Math.max(selection.startX, selection.endX);

        const startSelectedTime = startX * end + start;
        const endSelectedTime = endX * end + start;

        const selectedNotes = sequence.filter(
          (note) =>
            note.start <= endSelectedTime && note.end >= startSelectedTime
        );

        setSelection({ isSelecting: false, startX: 0, endX: 0 });
        setSelectedRange({ startX, endX });
        toast.success(
          `You selected ${selectedNotes.length} ${
            selectedNotes.length === 1 ? "note" : "notes"
          }`
        );
        console.log("Selected Range:", startSelectedTime, endSelectedTime);
        console.log("Selected Notes:", selectedNotes);
      }
    };

    const handleMouseClick = () => {
      setSelectedRange(null);
    };

    const drawSelection = (selection) => {
      if (selection.isSelecting) {
        const { startX, endX } = selection;
        const x = Math.min(startX, endX);
        const width = Math.abs(endX - startX);

        const selectionRect = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "rect"
        );
        selectionRect.setAttribute("x", `${x}`);
        selectionRect.setAttribute("y", "0");
        selectionRect.setAttribute("width", `${width}`);
        selectionRect.setAttribute("height", "1");
        selectionRect.setAttribute("fill", "rgba(0, 0, 255, 0.3)");

        svgElement.appendChild(selectionRect);
      }
    };
    drawSelection(selection);

    svgElement.addEventListener("click", handleMouseClick);
    window.addEventListener("mouseup", handleMouseUp);
    svgElement.addEventListener("mousedown", handleMouseDown);
    svgElement.addEventListener("mousemove", handleMouseMove);
    svgElement.addEventListener("mouseup", handleMouseUp);

    return () => {
      svgElement.removeEventListener("click", handleMouseClick);
      window.removeEventListener("mouseup", handleMouseUp);
      svgElement.removeEventListener("mousedown", handleMouseDown);
      svgElement.removeEventListener("mousemove", handleMouseMove);
      svgElement.removeEventListener("mouseup", handleMouseUp);
    };
  }, [sequence, selection]);

  useEffect(() => {
    if (selectedRange) {
      const { startX, endX } = selectedRange;
      const x = Math.min(startX, endX);
      const width = Math.abs(endX - startX);

      const selectionRect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      selectionRect.setAttribute("x", `${x}`);
      selectionRect.setAttribute("y", "0");
      selectionRect.setAttribute("width", `${width}`);
      selectionRect.setAttribute("height", "1");
      selectionRect.setAttribute("fill", "rgba(0, 0, 255, 0.3");
      svgRef.current.appendChild(selectionRect);
    }
  }, [selectedRange]);

  return (
    <PianoRollSvg
      ref={svgRef}
      width={page === "home" ? "80%" : "90%"}
      height={page === "home" ? "150" : "425"}
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
    />
  );
};

export default PianoRoll;
