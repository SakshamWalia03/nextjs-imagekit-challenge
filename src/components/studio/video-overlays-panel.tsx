"use client";

import {useEffect, useState} from "react";

import {ImageIcon, Palette, PenLine, Video} from "lucide-react";
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
import {
  CropMode,
  FocusMode,
  ImageOverlay,
  Overlay,
  OverlayBase,
  SolidBlock,
  TextOverlay,
  VideoOverlay,
} from "@/types/video-transformations";

// Extend Overlay with UI-specific ID
export type OverlayWithUIId = Overlay & {_uiId: string};

type OverlayType = "text" | "solid" | "image" | "video";

type VideoOverlaysPanelProps = {
  transforms: Overlay[];
  onTransformChange: (overlays: Overlay[]) => void;
};

export function VideoOverlaysPanel({
  transforms = [],
  onTransformChange,
}: VideoOverlaysPanelProps) {
  const [overlayList, setOverlayList] = useState<OverlayWithUIId[]>(
    transforms.map(o => ({...o, _uiId: uuid()}))
  );

  useEffect(() => {
    onTransformChange(overlayList.map(({_uiId, ...rest}) => rest));
  }, [overlayList]);

  const addOverlay = (type: OverlayType) => {
    const base: OverlayBase = {
      x: 0,
      y: 0,
      focus: "center",
      startOffset: 0,
      endOffset: 0,
      duration: 0,
    };
    let newOverlay: Overlay;

    switch (type) {
      case "text":
        newOverlay = {
          ...base,
          type: "text",
          text: "Sample Text",
          fontSize: 16,
          fontFamily: "Arial",
          color: "000000",
          align: "left",
          typography: [],
          rotation: 0,
        };
        break;
      case "solid":
        newOverlay = {
          ...base,
          type: "solid",
          color: "ff0000",
          width: 100,
          height: 100,
          opacity: 100,
          radius: 0,
        };
        break;
      case "image":
        newOverlay = {
          ...base,
          type: "image",
          src: "",
          width: 100,
          height: 100,
          rotation: 0,
          radius: 0,
          aspectRatio: "16-9",
          cropMode: "maintain_ratio",
        };
        break;
      case "video":
        newOverlay = {
          ...base,
          type: "video",
          src: "",
          width: 200,
          height: 100,
        };
        break;
      default:
        return;
    }

    setOverlayList([...overlayList, {...newOverlay, _uiId: uuid()}]);
  };

  const updateOverlay = (uiId: string, newProps: Partial<Overlay>) => {
    setOverlayList(
      overlayList.map(o => (o._uiId === uiId ? {...o, ...newProps} : o))
    );
  };

  const removeOverlay = (uiId: string) => {
    setOverlayList(overlayList.filter(o => o._uiId !== uiId));
  };

  return (
    <div className="h-full flex flex-col space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
      <div className="flex gap-2 mb-2">
        <Button onClick={() => addOverlay("text")}>Add Text</Button>
        <Button onClick={() => addOverlay("solid")}>Add Solid</Button>
        <Button onClick={() => addOverlay("image")}>Add Image</Button>
        <Button onClick={() => addOverlay("video")}>Add Video</Button>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {overlayList.map((overlay, index) => (
          <AccordionItem key={overlay._uiId} value={overlay._uiId}>
            <AccordionTrigger className="flex items-center gap-2 font-semibold text-gray-700">
              {overlay.type === "text" && <PenLine />}
              {overlay.type === "solid" && <Palette />}
              {overlay.type === "image" && <ImageIcon />}
              {overlay.type === "video" && <Video />}
              {overlay.type.charAt(0).toUpperCase() + overlay.type.slice(1)} #
              {index + 1}
            </AccordionTrigger>

            <AccordionContent className="space-y-4 p-2 bg-gray-50 rounded-lg border border-gray-200">
              {/* Base Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label>X Position</Label>
                  <Input
                    value={overlay.x}
                    onChange={e =>
                      updateOverlay(overlay._uiId, {x: e.target.value})
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Y Position</Label>
                  <Input
                    value={overlay.y}
                    onChange={e =>
                      updateOverlay(overlay._uiId, {y: e.target.value})
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Focus</Label>
                  <Select
                    value={overlay.focus || "center"}
                    onValueChange={val =>
                      updateOverlay(overlay._uiId, {focus: val as FocusMode})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "center",
                        "top",
                        "bottom",
                        "left",
                        "right",
                        "top_left",
                        "top_right",
                        "bottom_left",
                        "bottom_right",
                      ].map(f => (
                        <SelectItem key={f} value={f}>
                          {f}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Start Offset</Label>
                  <Input
                    value={overlay.startOffset}
                    onChange={e =>
                      updateOverlay(overlay._uiId, {
                        startOffset: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>End Offset</Label>
                  <Input
                    value={overlay.endOffset}
                    onChange={e =>
                      updateOverlay(overlay._uiId, {endOffset: e.target.value})
                    }
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Duration</Label>
                  <Input
                    value={overlay.duration}
                    onChange={e =>
                      updateOverlay(overlay._uiId, {duration: e.target.value})
                    }
                  />
                </div>
              </div>

              {/* Overlay type-specific fields */}
              {overlay.type === "text" && (
                <TextOverlayFields
                  overlay={overlay as TextOverlay}
                  updateOverlay={updateOverlay}
                />
              )}
              {overlay.type === "solid" && (
                <SolidOverlayFields
                  overlay={overlay as SolidBlock}
                  updateOverlay={updateOverlay}
                />
              )}
              {overlay.type === "image" && (
                <ImageOverlayFields
                  overlay={overlay as ImageOverlay}
                  updateOverlay={updateOverlay}
                />
              )}
              {overlay.type === "video" && (
                <VideoOverlayFields
                  overlay={overlay as VideoOverlay}
                  updateOverlay={updateOverlay}
                />
              )}

              <Button
                className="mt-2"
                onClick={() => removeOverlay(overlay._uiId)}
              >
                Remove Overlay
              </Button>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

// ================= Type-specific Field Components =================

function TextOverlayFields({
  overlay,
  updateOverlay,
}: {
  overlay: TextOverlay;
  updateOverlay: (uiId: string, newProps: Partial<Overlay>) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <Label>Text</Label>
        <Input
          value={overlay.text}
          onChange={e => updateOverlay(overlay._uiId, {text: e.target.value})}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Font Size</Label>
        <Input
          type="number"
          value={overlay.fontSize}
          onChange={e =>
            updateOverlay(overlay._uiId, {fontSize: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Font Family</Label>
        <Input
          value={overlay.fontFamily}
          onChange={e =>
            updateOverlay(overlay._uiId, {fontFamily: e.target.value})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Color</Label>
        <Input
          type="color"
          value={`#${overlay.color}`}
          onChange={e =>
            updateOverlay(overlay._uiId, {
              color: e.target.value.replace("#", ""),
            })
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Align</Label>
        <Select
          value={overlay.align || "left"}
          onValueChange={val =>
            updateOverlay(overlay._uiId, {
              align: val as "left" | "center" | "right",
            })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="right">Right</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Rotation</Label>
        <Input
          type="number"
          value={overlay.rotation}
          onChange={e =>
            updateOverlay(overlay._uiId, {rotation: Number(e.target.value)})
          }
        />
      </div>
      <div className="col-span-2 flex gap-2">
        <Toggle
          checked={overlay.typography?.includes("b")}
          onCheckedChange={val => {
            const typ = overlay.typography || [];
            updateOverlay(overlay._uiId, {
              typography: val ? [...typ, "b"] : typ.filter(t => t !== "b"),
            });
          }}
        >
          B
        </Toggle>
        <Toggle
          checked={overlay.typography?.includes("i")}
          onCheckedChange={val => {
            const typ = overlay.typography || [];
            updateOverlay(overlay._uiId, {
              typography: val ? [...typ, "i"] : typ.filter(t => t !== "i"),
            });
          }}
        >
          I
        </Toggle>
        <Toggle
          checked={overlay.typography?.includes("strikethrough")}
          onCheckedChange={val => {
            const typ = overlay.typography || [];
            updateOverlay(overlay._uiId, {
              typography: val
                ? [...typ, "strikethrough"]
                : typ.filter(t => t !== "strikethrough"),
            });
          }}
        >
          S
        </Toggle>
      </div>
    </div>
  );
}

function SolidOverlayFields({
  overlay,
  updateOverlay,
}: {
  overlay: SolidBlock;
  updateOverlay: (uiId: string, newProps: Partial<Overlay>) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <Label>Color</Label>
        <Input
          type="color"
          value={`#${overlay.color}`}
          onChange={e =>
            updateOverlay(overlay._uiId, {
              color: e.target.value.replace("#", ""),
            })
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Width</Label>
        <Input
          type="number"
          value={overlay.width}
          onChange={e =>
            updateOverlay(overlay._uiId, {width: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Height</Label>
        <Input
          type="number"
          value={overlay.height}
          onChange={e =>
            updateOverlay(overlay._uiId, {height: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Opacity</Label>
        <Input
          type="number"
          value={overlay.opacity}
          onChange={e =>
            updateOverlay(overlay._uiId, {opacity: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Radius</Label>
        <Input
          type="number"
          value={overlay.radius}
          onChange={e =>
            updateOverlay(overlay._uiId, {radius: Number(e.target.value)})
          }
        />
      </div>
    </div>
  );
}

function ImageOverlayFields({
  overlay,
  updateOverlay,
}: {
  overlay: ImageOverlay;
  updateOverlay: (uiId: string, newProps: Partial<Overlay>) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <Label>Src</Label>
        <Input
          value={overlay.src}
          onChange={e => updateOverlay(overlay._uiId, {src: e.target.value})}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Width</Label>
        <Input
          type="number"
          value={overlay.width}
          onChange={e =>
            updateOverlay(overlay._uiId, {width: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Height</Label>
        <Input
          type="number"
          value={overlay.height}
          onChange={e =>
            updateOverlay(overlay._uiId, {height: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Rotation</Label>
        <Input
          type="number"
          value={overlay.rotation}
          onChange={e =>
            updateOverlay(overlay._uiId, {rotation: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Radius</Label>
        <Input
          type="number"
          value={overlay.radius}
          onChange={e =>
            updateOverlay(overlay._uiId, {radius: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Aspect Ratio</Label>
        <Select
          value={overlay.aspectRatio}
          onValueChange={val =>
            updateOverlay(overlay._uiId, {aspectRatio: val as string})
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16-9">16:9</SelectItem>
            <SelectItem value="4-3">4:3</SelectItem>
            <SelectItem value="1-1">1:1</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Crop Mode</Label>
        <Select
          value={overlay.cropMode}
          onValueChange={val =>
            updateOverlay(overlay._uiId, {cropMode: val as CropMode})
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maintain_ratio">Maintain Ratio</SelectItem>
            <SelectItem value="stretch">Stretch</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function VideoOverlayFields({
  overlay,
  updateOverlay,
}: {
  overlay: VideoOverlay;
  updateOverlay: (uiId: string, newProps: Partial<Overlay>) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <Label>Src</Label>
        <Input
          value={overlay.src}
          onChange={e => updateOverlay(overlay._uiId, {src: e.target.value})}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Width</Label>
        <Input
          type="number"
          value={overlay.width}
          onChange={e =>
            updateOverlay(overlay._uiId, {width: Number(e.target.value)})
          }
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Height</Label>
        <Input
          type="number"
          value={overlay.height}
          onChange={e =>
            updateOverlay(overlay._uiId, {height: Number(e.target.value)})
          }
        />
      </div>
    </div>
  );
}
