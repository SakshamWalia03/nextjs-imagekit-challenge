"use client";

import {useEffect, useState} from "react";

import {
  Bold,
  ImageIcon,
  Italic,
  Palette,
  PenLine,
  Strikethrough,
} from "lucide-react";
import {v4 as uuid} from "uuid";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Toggle} from "@/components/ui/toggle";
import {type Overlay, type TextOverlay} from "@/types/image-transformations";

export type FlipMode = "h" | "v" | "h_v";
export type OverlayType = "text" | "solid" | "gradient" | "image";

export type BaseOverlay = {id: string; type: OverlayType};
export type SolidOverlay = BaseOverlay & {type: "solid"; color: string};
export type GradientOverlay = BaseOverlay & {
  type: "gradient";
  colors: string[];
  direction?: string;
};
export type ImageOverlay = BaseOverlay & {
  type: "image";
  url: string;
  width?: number;
  height?: number;
  rotation?: number;
};
export type OverlayExtended =
  | TextOverlay
  | SolidOverlay
  | GradientOverlay
  | ImageOverlay;

const textAreaStyles =
  "rounded-lg px-4 py-2 min-h-[80px] resize-y focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";
const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";
const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";
const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

type OverlaysPanelProps = {
  overlays: OverlayExtended[];
  onTransformChange: (overlays: OverlayExtended[]) => void;
};

export function OverlaysPanel({
  overlays = [],
  onTransformChange,
}: OverlaysPanelProps) {
  const [overlayList, setOverlayList] = useState<OverlayExtended[]>(overlays);

  useEffect(() => {
    onTransformChange(overlayList);
  }, [overlayList, onTransformChange]);

  const addOverlay = (type: OverlayType) => {
    let newOverlay: OverlayExtended;
    switch (type) {
      case "text":
        newOverlay = {
          id: uuid(),
          type: "text",
          text: "Sample Text",
          fontSize: 16,
          color: "000000",
          bold: false,
          italic: false,
          strike: false,
          rotation: 0,
        };
        break;
      case "solid":
        newOverlay = {
          id: uuid(),
          type: "solid",
          color: "ff0000",
          width: 100,
          height: 100,
          radius: 0,
        };
        break;
      case "gradient":
        newOverlay = {
          id: uuid(),
          type: "gradient",
          direction: "top",
          fromColor: "000000",
          toColor: "000000",
          stopPoint: 0,
          width: 100,
          height: 100,
          radius: 0,
        };
        break;
      case "image":
        newOverlay = {
          id: uuid(),
          type: "image",
          src: "https://via.placeholder.com/150",
          width: 100,
          height: 100,
          x: 0,
          y: 0,
          opacity: undefined,
          bgColor: undefined,
          border: undefined,
          radius: undefined,
          rotation: undefined,
          flip: undefined,
        };
        break;
      default:
        return;
    }

    setOverlayList([newOverlay]);
  };

  const updateOverlay = (id: string, newProps: Partial<OverlayExtended>) => {
    setOverlayList(
      overlayList.map(o => (o.id === id ? {...o, ...newProps} : o))
    );
  };

  const removeOverlay = (id: string) => {
    setOverlayList(overlayList.filter(o => o.id !== id));
  };

  const resetAll = () => {
    setOverlayList([]);
  };

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      {/* Add Overlay Buttons */}

      <Accordion type="multiple">
        <AccordionItem value="titles">
          <AccordionTrigger className="py-3 cursor-pointer flex items-center gap-2 text-white">
            Overlays
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <Button
                className={`${buttonStyles} text-white`}
                style={gradientBg}
                onClick={() => addOverlay("text")}
              >
                Add Text
              </Button>
              <Button
                className={`${buttonStyles} text-white`}
                style={gradientBg}
                onClick={() => addOverlay("solid")}
              >
                Add Solid
              </Button>
              <Button
                className={`${buttonStyles} text-white`}
                style={gradientBg}
                onClick={() => addOverlay("gradient")}
              >
                Add Gradient
              </Button>
              <Button
                className={`${buttonStyles} text-white`}
                style={gradientBg}
                onClick={() => addOverlay("image")}
              >
                Add Image
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {overlayList.map(overlay => (
          <AccordionItem key={overlay.id} value={overlay.id}>
            <AccordionTrigger className="py-3 cursor-pointer flex items-center gap-2 text-white">
              {overlay.type === "text" && <PenLine className="size-4" />}
              {overlay.type === "solid" && <Palette className="size-4" />}
              {overlay.type === "gradient" && <Palette className="size-4" />}
              {overlay.type === "image" && <ImageIcon className="size-4" />}
              {overlay.type.charAt(0).toUpperCase() +
                overlay.type.slice(1)}{" "}
              Overlay
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              {overlay.type === "text" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Text</Label>
                    <Input
                      className={inputStyles}
                      placeholder="Enter text"
                      value={overlay.text}
                      onChange={e =>
                        updateOverlay(overlay.id, {text: e.target.value})
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Font Size</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.fontSize}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          fontSize: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Font Family</Label>
                    <Input
                      className={inputStyles}
                      placeholder="Eg. Arial"
                      value={overlay.fontFamily}
                      onChange={e =>
                        updateOverlay(overlay.id, {fontFamily: e.target.value})
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Text Color</Label>
                    <Input
                      className={inputStyles}
                      type="color"
                      value={`#+${overlay.color}`}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          color: e.target.value.replace("#", ""),
                        })
                      }
                    />
                  </div>

                  {/* Padding */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Padding</Label>
                    <Input
                      min={0}
                      placeholder="Eg. 10 or 10_15"
                      value={overlay.padding}
                      onChange={e =>
                        updateOverlay(overlay.id, {padding: e.target.value})
                      }
                    />
                  </div>

                  {/* Alignment */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Text Align</Label>
                    <Select
                      value={overlay.align}
                      onValueChange={val =>
                        updateOverlay(overlay.id, {
                          align: val as "left" | "center" | "right",
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                        <SelectItem value="right">Right</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Flip */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Flip</Label>
                    <Select
                      value={overlay.flip ?? "none"}
                      onValueChange={val =>
                        updateOverlay(overlay.id, {
                          flip: val === "none" ? undefined : (val as FlipMode),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select flip" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="h">Horizontal</SelectItem>
                        <SelectItem value="v">Vertical</SelectItem>
                        <SelectItem value="h_v">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Styles */}
                  <div className="col-span-2 flex gap-2 justify-around rounded-lg p-2">
                    <Toggle
                      checked={overlay.bold}
                      onCheckedChange={val =>
                        updateOverlay(overlay.id, {bold: val})
                      }
                    >
                      <Bold />
                    </Toggle>
                    <Toggle
                      checked={overlay.italic}
                      onCheckedChange={val =>
                        updateOverlay(overlay.id, {italic: val})
                      }
                    >
                      <Italic />
                    </Toggle>
                    <Toggle
                      checked={overlay.strike}
                      onCheckedChange={val =>
                        updateOverlay(overlay.id, {strike: val})
                      }
                    >
                      <Strikethrough />
                    </Toggle>
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Rotation (°)</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.rotation}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          rotation: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-span-2 flex flex-col gap-2 rounded-lg p-2">
                    <Button
                      className={`text-white ${buttonStyles}`}
                      style={gradientBg}
                      onClick={() => removeOverlay(overlay.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              )}

              {overlay.type === "solid" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Solid Color</Label>
                    <Input
                      type="color"
                      value={
                        overlay.color.startsWith("#")
                          ? overlay.color
                          : `#${overlay.color}`
                      }
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          color: e.target.value.replace("#", ""),
                        })
                      }
                      className="w-full h-10 p-0 rounded-xl border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Width</Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      min={0}
                      value={overlay.width || "Auto"}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          width: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Height</Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={overlay.height || ""}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          height: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Radius</Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={overlay.radius || ""}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          radius: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>

                  <Button
                    className={`col-span-2 ${buttonStyles} text-white`}
                    style={gradientBg}
                    onClick={() => removeOverlay(overlay.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {overlay.type === "gradient" && (
                <div className="grid grid-cols-2 gap-3">
                  {/* Direction */}
                  <div className="col-span-2 flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Direction</Label>
                    <Select
                      value={overlay.direction || "top"}
                      onValueChange={val =>
                        updateOverlay(overlay.id, {direction: val})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select direction" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "top",
                          "top_right",
                          "right",
                          "bottom_right",
                          "bottom",
                          "bottom_left",
                          "left",
                          "topleft",
                        ].map(dir => (
                          <SelectItem key={dir} value={dir}>
                            {dir.replace("_", " ").toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {/* From Color */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">From Color</Label>
                    <Input
                      type="color"
                      value={
                        overlay.fromColor?.startsWith("#")
                          ? overlay.fromColor
                          : `#${overlay.fromColor}`
                      }
                      className={inputStyles}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          fromColor: e.target.value.replace("#", ""),
                        })
                      }
                    />
                  </div>

                  {/* To Color */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">To Color</Label>
                    <Input
                      type="color"
                      value={
                        overlay.toColor?.startsWith("#")
                          ? overlay.toColor
                          : `#${overlay.toColor}`
                      }
                      className={inputStyles}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          toColor: e.target.value.replace("#", ""),
                        })
                      }
                    />
                  </div>

                  {/* Stop Point */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">
                      Stop Point (%)
                    </Label>
                    <Input
                      type="number"
                      value={overlay.stopPoint || 0}
                      min={0}
                      max={100}
                      className={inputStyles}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          stopPoint: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  {/* Width */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Width</Label>
                    <Input
                      type="number"
                      value={overlay.width || 100}
                      className={inputStyles}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          width: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  {/* Height */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Height</Label>
                    <Input
                      type="number"
                      value={overlay.height || 100}
                      className={inputStyles}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          height: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  {/* Radius */}
                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Radius</Label>
                    <Input
                      type="number"
                      value={overlay.radius || 0}
                      className={inputStyles}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          radius: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <Button
                    className={`col-span-2 ${buttonStyles} text-white`}
                    style={gradientBg}
                    onClick={() => removeOverlay(overlay.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}

              {overlay.type === "image" && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Image URL</Label>
                    <Input
                      className={inputStyles}
                      placeholder="Enter image URL"
                      value={overlay.src}
                      onChange={e =>
                        updateOverlay(overlay.id, {src: e.target.value})
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Width (px)</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.width || ""}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          width: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Height (px)</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.height || ""}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          height: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">X Position</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.x || 0}
                      onChange={e =>
                        updateOverlay(overlay.id, {x: Number(e.target.value)})
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Y Position</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.y || 0}
                      onChange={e =>
                        updateOverlay(overlay.id, {y: Number(e.target.value)})
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Opacity (%)</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      min={0}
                      max={100}
                      value={overlay.opacity || 100}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          opacity: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">
                      Background Color
                    </Label>
                    <Input
                      className={inputStyles}
                      type="color"
                      value={
                        overlay.bgColor?.startsWith("#")
                          ? overlay.bgColor
                          : `#${overlay.bgColor}`
                      }
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          bgColor: e.target.value.replace("#", ""),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">
                      Border (width_color)
                    </Label>
                    <Input
                      className={inputStyles}
                      placeholder="Eg. 5_FFF000"
                      value={overlay.border || ""}
                      onChange={e =>
                        updateOverlay(overlay.id, {border: e.target.value})
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Radius</Label>
                    <Input
                      className={inputStyles}
                      placeholder="0 or max"
                      value={overlay.radius?.toString() || "0"}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          radius:
                            e.target.value === "max"
                              ? "max"
                              : Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Rotation (°)</Label>
                    <Input
                      className={inputStyles}
                      type="number"
                      value={overlay.rotation || 0}
                      onChange={e =>
                        updateOverlay(overlay.id, {
                          rotation: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex flex-col gap-2 rounded-lg p-2">
                    <Label className="text-xs font-medium">Flip</Label>
                    <Select
                      value={overlay.flip || "h"}
                      onValueChange={val =>
                        updateOverlay(overlay.id, {flip: val as FlipMode})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select flip" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="h">Horizontal</SelectItem>
                        <SelectItem value="v">Vertical</SelectItem>
                        <SelectItem value="h_v">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    className={`col-span-2 ${buttonStyles} text-white`}
                    style={gradientBg}
                    onClick={() => removeOverlay(overlay.id)}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Reset All */}
      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetAll}
            className={`flex-1 ${buttonStyles}`}
            style={gradientBg}
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
}
