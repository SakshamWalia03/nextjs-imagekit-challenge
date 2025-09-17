import {Crop, Focus, Grid3X3, RotateCw} from "lucide-react";

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
import {
  BasicsTransform,
  CropMode,
  FocusMode,
} from "@/types/video-transformations";

import {Slider} from "../ui/slider";

type VideoBasicsPanelProps = {
  transforms: BasicsTransform;
  onTransformChange: (transforms: BasicsTransform) => void;
};

const aspectRatios = [
  {label: "Custom", value: "custom"},
  {label: "1:1 (Square)", value: "1-1"},
  {label: "16:9 (Wide)", value: "16-9"},
  {label: "9:16 (Portrait)", value: "9-16"},
  {label: "4:3 (Standard)", value: "4-3"},
];

const cropModes = [
  {label: "Maintain Ratio", value: "maintain_ratio"},
  {label: "Pad & Resize", value: "pad_resize"},
  {label: "Force", value: "force"},
  {label: "At Max", value: "at_max"},
  {label: "At Least", value: "at_least"},
  {label: "Extract", value: "extract"},
];

const focusModes = [
  {label: "Center", value: "center"},
  {label: "Top", value: "top"},
  {label: "Bottom", value: "bottom"},
  {label: "Left", value: "left"},
  {label: "Right", value: "right"},
  {label: "Top Left", value: "top_left"},
  {label: "Top Right", value: "top_right"},
  {label: "Bottom Left", value: "bottom_left"},
  {label: "Bottom Right", value: "bottom_right"},
  {label: "Custom", value: "custom"},
];

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function VideoBasicsPanel({
  transforms,
  onTransformChange,
}: VideoBasicsPanelProps) {
  const update = (patch: Partial<BasicsTransform>) => {
    onTransformChange({...transforms, ...patch});
  };

  const resetDimensions = () =>
    update({width: undefined, height: undefined, aspectRatio: undefined});
  const resetCropFocus = () =>
    update({
      cropMode: undefined,
      focus: undefined,
      x: undefined,
      y: undefined,
      xc: undefined,
      yc: undefined,
      zoom: undefined,
    });
  const resetBackground = () => update({background: undefined});
  const resetBorder = () => update({border: undefined, radius: undefined});
  const resetRotation = () => update({rotate: undefined});
  const resetAll = () => onTransformChange({});

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Resize & Crop */}
        <AccordionItem value="resize-crop">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Crop className="size-4" /> Resize & Crop
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Width</Label>
                <Input
                  type="text"
                  placeholder="Auto"
                  value={transforms.width || ""}
                  onChange={e => update({width: e.target.value || undefined})}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium">Height</Label>
                <Input
                  type="text"
                  placeholder="Auto"
                  value={transforms.height || ""}
                  onChange={e => update({height: e.target.value || undefined})}
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Aspect Ratio</Label>
              <Select
                value={transforms.aspectRatio || "custom"}
                onValueChange={v =>
                  update({aspectRatio: v === "custom" ? undefined : v})
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue placeholder="Select ratio" />
                </SelectTrigger>
                <SelectContent>
                  {aspectRatios.map(r => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Focus</Label>
              <Select
                value={transforms.focus || "center"}
                onValueChange={v =>
                  update({focus: v === "center" ? undefined : (v as FocusMode)})
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {focusModes.map(f => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {transforms.focus === "custom" && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">X Position</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={transforms.x || ""}
                    onChange={e =>
                      update({
                        x: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Y Position</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={transforms.y || ""}
                    onChange={e =>
                      update({
                        y: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs font-medium">Crop Mode</Label>
              <Select
                value={transforms.cropMode || "maintain_ratio"}
                onValueChange={v =>
                  update({
                    cropMode:
                      v === "maintain_ratio" ? undefined : (v as CropMode),
                  })
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cropModes.map(c => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">
                Zoom{" "}
                {transforms.zoom
                  ? `${transforms.zoom?.toFixed(1)}` + "x"
                  : "1.0x"}
              </Label>
              <Slider
                min={0.1}
                max={5}
                step={0.1}
                value={[transforms.zoom || 1]}
                onValueChange={([v]) => update({zoom: v === 1 ? undefined : v})}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-medium">Device Pixel Ratio</Label>
              <Select
                value={transforms.dpr?.toString() || "1"}
                onValueChange={v =>
                  update({
                    dpr:
                      v === "1"
                        ? undefined
                        : v === "auto"
                          ? "auto"
                          : parseInt(v),
                  })
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="1">1x (Standard)</SelectItem>
                  <SelectItem value="2">2x (Retina)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className={`flex-1 ${buttonStyles}`}
                onClick={resetDimensions}
              >
                Reset Dimensions
              </Button>
              <Button
                variant="outline"
                className={`flex-1 ${buttonStyles}`}
                onClick={resetCropFocus}
              >
                Reset Crop & Focus
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Background */}
        <AccordionItem value="background">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Focus className="size-4" /> Background
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            {/* Background controls */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">Type</Label>
              <Select
                value={transforms.background?.type || "solid"}
                onValueChange={value =>
                  update({
                    background: {
                      ...transforms.background,
                      type: value as "solid" | "blurred",
                    },
                  })
                }
              >
                <SelectTrigger className={inputStyles} style={gradientBg}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="blurred">Blurred</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {transforms.background?.type === "solid" && (
              <div className="space-y-2">
                <Label className="text-xs font-medium">Color</Label>
                <Input
                  type="text"
                  placeholder="#FFFFFF"
                  value={transforms.background?.color || ""}
                  onChange={e =>
                    update({
                      background: {
                        ...transforms.background,
                        color: e.target.value || undefined,
                      },
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>
            )}

            {transforms.background?.type === "blurred" && (
              <>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Blur Intensity</Label>
                  <Input
                    type="text"
                    placeholder="Auto"
                    value={transforms.background?.blurIntensity || ""}
                    onChange={e =>
                      update({
                        background: {
                          ...transforms.background,
                          blurIntensity: e.target.value || undefined,
                        },
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Brightness</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={transforms.background?.brightness || ""}
                    onChange={e =>
                      update({
                        background: {
                          ...transforms.background,
                          brightness: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        },
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </>
            )}

            <Button
              variant="outline"
              className={`w-full ${buttonStyles}`}
              onClick={resetBackground}
            >
              Reset Background
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Border & Radius */}
        <AccordionItem value="border-radius">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Grid3X3 className="size-4" /> Border & Radius
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Border Width</Label>
              <Input
                type="text"
                placeholder="0"
                value={transforms.border?.width || ""}
                onChange={e =>
                  update({
                    border: {
                      ...transforms.border,
                      width: e.target.value || undefined,
                    },
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Border Color</Label>
              <Input
                type="text"
                placeholder="#000000"
                value={transforms.border?.color || ""}
                onChange={e =>
                  update({
                    border: {
                      ...transforms.border,
                      color: e.target.value || undefined,
                    },
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Radius</Label>
              <Input
                type="text"
                placeholder="0"
                value={transforms.radius || ""}
                onChange={e => update({radius: e.target.value || undefined})}
                className={inputStyles}
                style={gradientBg}
              />
            </div>
            <Button
              variant="outline"
              className={`w-full ${buttonStyles}`}
              onClick={resetBorder}
            >
              Reset Border & Radius
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* Rotation */}
        <AccordionItem value="rotation">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <RotateCw className="size-4" /> Rotation
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <Select
              value={(transforms.rotate || 0).toString()}
              onValueChange={v =>
                update({rotate: parseInt(v) as 0 | 90 | 180 | 270 | 360})
              }
            >
              <SelectTrigger className={inputStyles} style={gradientBg}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[0, 90, 180, 270, 360].map(r => (
                  <SelectItem key={r} value={r.toString()}>
                    {r}°
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className={`w-full ${buttonStyles}`}
              onClick={resetRotation}
            >
              Reset Rotation
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset All */}
      <div className="pt-4 pb-12 px-0.5">
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
  );
}
