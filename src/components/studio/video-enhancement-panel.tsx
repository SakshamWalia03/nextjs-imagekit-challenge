import {Crop, GalleryThumbnails, RotateCcw} from "lucide-react";

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
import {CropMode, Enhancements} from "@/types/video-transformations";

type VideoEnhancementProps = {
  transforms: Enhancements;
  onTransformChange: (transform: Enhancements) => void;
};

const aspectRatios = [
  {label: "Custom", value: "custom"},
  {label: "1:1 (Square)", value: "1-1"},
  {label: "16:9 (Wide)", value: "16-9"},
  {label: "9:16 (Portrait)", value: "9-16"},
  {label: "4:3 (Standard)", value: "4-3"},
];

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function VideoEnhancementPanel({
  transforms,
  onTransformChange,
}: VideoEnhancementProps) {
  const update = (patch: Partial<Enhancements>) => {
    onTransformChange({...transforms, ...patch});
  };

  const resetAll = () => onTransformChange({});
  const resetThumbnail = () => update({thumbnail: undefined});
  const resetTrimming = () => update({trimming: undefined});

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Thumbnail */}
        {/* Thumbnail */}
        <AccordionItem value="thumbnail">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <GalleryThumbnails className="size-4" /> Thumbnail
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="grid grid-cols-2 gap-3">
              {/* Time */}
              <div className="col-span-2 space-y-2">
                <Label className="text-xs font-medium">Time</Label>
                <Input
                  type="text"
                  placeholder="Auto"
                  value={transforms.thumbnail?.time || ""}
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        time: e.target.value || undefined,
                      },
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {/* Width */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Width</Label>
                <Input
                  type="number"
                  placeholder="Auto"
                  value={transforms.thumbnail?.width || ""}
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        width: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      },
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {/* Height */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Height</Label>
                <Input
                  type="number"
                  placeholder="Auto"
                  value={transforms.thumbnail?.height || ""}
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        height: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      },
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {/* Aspect Ratio */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Aspect Ratio</Label>
                <Select
                  value={transforms.thumbnail?.aspectRatio || "custom"}
                  onValueChange={v =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        aspectRatio: v === "custom" ? undefined : v,
                      },
                    })
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

              {/* Crop Mode */}
              <div className="col-span-2 space-y-2">
                <Label className="text-xs font-medium">Crop Mode</Label>
                <Select
                  value={transforms.thumbnail?.cropMode || "maintain_ratio"}
                  onValueChange={v =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        cropMode: v as CropMode,
                      },
                    })
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue placeholder="Select crop mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="maintain_ratio">
                      Maintain Ratio (default)
                    </SelectItem>
                    <SelectItem value="pad_resize">Pad Resize</SelectItem>
                    <SelectItem value="force">Force</SelectItem>
                    <SelectItem value="at_max">At Max</SelectItem>
                    <SelectItem value="at_least">At Least</SelectItem>
                    <SelectItem value="extract">Extract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Border Width */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Border Width</Label>
                <Input
                  type="number"
                  value={transforms.thumbnail?.border?.width || ""}
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        border: {
                          ...transforms.thumbnail?.border,
                          width: e.target.value ? parseInt(e.target.value) : 0,
                          color:
                            transforms.thumbnail?.border?.color || "000000",
                        },
                      },
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {/* Border Color */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Border Color</Label>
                <Input
                  type="color"
                  value={
                    transforms.thumbnail?.border?.color
                      ? `#${transforms.thumbnail.border.color}`
                      : "#000000"
                  }
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        border: {
                          ...transforms.thumbnail?.border,
                          color: e.target.value.replace("#", ""),
                          width: transforms.thumbnail?.border?.width || 0,
                        },
                      },
                    })
                  }
                  className="w-full rounded-xl cursor-pointer border-none"
                />
              </div>

              {/* Radius */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Radius</Label>
                <Input
                  type="text"
                  placeholder="0 or max"
                  value={transforms.thumbnail?.radius || ""}
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        radius:
                          e.target.value === "max"
                            ? "max"
                            : parseInt(e.target.value),
                      },
                    })
                  }
                  className={inputStyles}
                  style={gradientBg}
                />
              </div>

              {/* Background Color */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Background Color</Label>
                <Input
                  type="color"
                  value={
                    transforms.thumbnail?.bg
                      ? `#${transforms.thumbnail.bg}`
                      : "#ffffff"
                  }
                  onChange={e =>
                    update({
                      thumbnail: {
                        ...transforms.thumbnail,
                        bg: e.target.value.replace("#", ""),
                      },
                    })
                  }
                  className="w-full rounded-xl cursor-pointer border-none"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Button
                  variant="ghost"
                  onClick={resetThumbnail}
                  className="w-full rounded-4xl"
                >
                  Reset Thumbnail
                </Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Trimming */}
        <AccordionItem value="trimming">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Crop className="size-4" /> Trimming
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="space-y-2">
              <Label className="text-xs font-medium">Start Offset</Label>
              <Input
                type="text"
                placeholder="0"
                value={transforms.trimming?.startOffset || ""}
                onChange={e =>
                  update({
                    trimming: {
                      ...transforms.trimming,
                      startOffset: e.target.value || undefined,
                    },
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">End Offset</Label>
              <Input
                type="text"
                placeholder="0"
                value={transforms.trimming?.endOffset || ""}
                onChange={e =>
                  update({
                    trimming: {
                      ...transforms.trimming,
                      endOffset: e.target.value || undefined,
                    },
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium">Duration</Label>
              <Input
                type="text"
                placeholder="Auto"
                value={transforms.trimming?.duration || ""}
                onChange={e =>
                  update({
                    trimming: {
                      ...transforms.trimming,
                      duration: e.target.value || undefined,
                    },
                  })
                }
                className={inputStyles}
                style={gradientBg}
              />
            </div>
            <div className="col-span-2 space-y-2">
              <Button
                variant="ghost"
                onClick={resetTrimming}
                className="w-full rounded-4xl"
              >
                Reset Trimming
              </Button>
            </div>
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
