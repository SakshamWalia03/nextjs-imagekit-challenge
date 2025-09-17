 
import {Brain, Crop, Palette, PenLine, Zap} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {type AiMagic} from "@/types/image-transformations";

import {Input} from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {Slider} from "../ui/slider";
import {Switch} from "../ui/switch";
import {Textarea} from "../ui/textarea";

type AiMagicControlsProps = {
  transforms: AiMagic;
  onTransformChange: (transforms: AiMagic) => void;
};

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

export function AIMagicPanel({
  transforms,
  onTransformChange,
}: AiMagicControlsProps) {
  const update = (patch: Partial<AiMagic>) => {
    onTransformChange({...transforms, ...patch});
  };

  const updateBackground = (
    patch: Partial<NonNullable<AiMagic["background"]>>
  ) => {
    update({
      background: {
        ...transforms.background,
        ...patch,
      },
    });
  };

  const updateEditing = (patch: Partial<NonNullable<AiMagic["editing"]>>) => {
    update({
      editing: {
        ...transforms.editing,
        ...patch,
      },
    });
  };

  const updateShadowLighting = (
    patch: Partial<NonNullable<AiMagic["shadowLighting"]>["dropShadow"]>
  ) => {
    update({
      shadowLighting: {
        ...transforms.shadowLighting,
        dropShadow: {
          ...transforms.shadowLighting?.dropShadow,
          ...patch,
        },
      },
    });
  };

  const updateGeneration = (
    patch: Partial<NonNullable<AiMagic["generation"]>>
  ) => {
    update({
      generation: {
        ...transforms.generation,
        ...patch,
      },
    });
  };

  const updateCropping = (patch: Partial<NonNullable<AiMagic["cropping"]>>) => {
    update({
      cropping: {
        ...transforms.cropping,
        ...patch,
      },
    });
  };

  const resetAll = () => {
    update({
      background: undefined,
      editing: undefined,
      shadowLighting: undefined,
      generation: undefined,
      cropping: undefined,
    });
  };

  const resetBackground = () =>
    update({
      background: undefined,
    });

  const resetEditing = () =>
    update({
      editing: undefined,
    });

  const resetShadowLighting = () =>
    update({
      shadowLighting: undefined,
    });

  const resetGeneration = () =>
    update({
      generation: undefined,
    });

  const resetCropping = () =>
    update({
      cropping: undefined,
    });

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <div>
        <Accordion type="multiple">
          {/* Background */}
          <AccordionItem value="background">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Palette className="size-4" />
                Background
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-1 gap-3">
                {/* Remove background */}
                <div
                  className="flex items-center justify-between rounded-lg p-3"
                  style={gradientBg}
                >
                  <Label className="text-xs font-medium" id="removeBg">
                    Remove Background
                  </Label>
                  <Switch
                    id="removeBg"
                    checked={!!transforms.background?.remove}
                    onCheckedChange={checked =>
                      updateBackground({remove: checked ? true : undefined})
                    }
                  />
                </div>

                {/* Mode */}
                <div className="flex flex-col gap-3 p-2 justify-center">
                  <Label className="text-xs font-medium">Mode</Label>
                  <Select
                    value={transforms.background?.mode ?? "none"}
                    onValueChange={value =>
                      updateBackground({
                        mode:
                          value === "none"
                            ? undefined
                            : (value as "standard" | "economy"),
                      })
                    }
                  >
                    <SelectTrigger className={inputStyles} style={gradientBg}>
                      <SelectValue placeholder="Select Mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="economy">Economy</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Change Prompt */}
                <div className="flex flex-col gap-3 p-2 justify-center">
                  <Label className="text-xs font-medium">Prompt</Label>
                  <Textarea
                    placeholder="Give a prompt for background generation"
                    value={transforms.background?.changePrompt || ""}
                    onChange={e =>
                      updateBackground({
                        changePrompt: e.target.value || undefined,
                      })
                    }
                    className={textAreaStyles}
                    style={gradientBg}
                  />
                </div>

                {/* Generative Fill */}
                <div className="flex flex-col gap-3 p-2 justify-center">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-medium">
                      Generative Fill
                    </Label>
                    <Switch
                      checked={!!transforms.background?.generativeFill}
                      onCheckedChange={checked =>
                        updateBackground(
                          checked
                            ? {
                                generativeFill: {
                                  prompt: undefined,
                                  width: undefined,
                                  height: undefined,
                                  cropMode: undefined,
                                },
                              }
                            : {generativeFill: undefined}
                        )
                      }
                    />
                  </div>

                  {transforms.background?.generativeFill && (
                    <>
                      {/* Prompt */}
                      <Textarea
                        placeholder="Prompt for generative fill"
                        value={
                          transforms.background.generativeFill.prompt || ""
                        }
                        onChange={e =>
                          updateBackground({
                            generativeFill: {
                              ...transforms.background?.generativeFill,
                              prompt: e.target.value || undefined,
                            },
                          })
                        }
                        className={textAreaStyles}
                        style={gradientBg}
                      />

                      {/* Width & Height */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Width</Label>
                          <Input
                            type="number"
                            placeholder="Auto"
                            min={0}
                            value={
                              transforms.background.generativeFill.width ?? ""
                            }
                            onChange={e =>
                              updateBackground({
                                generativeFill: {
                                  ...transforms.background?.generativeFill,
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

                        <div className="space-y-2">
                          <Label className="text-xs font-medium">Height</Label>
                          <Input
                            type="number"
                            placeholder="Auto"
                            min={0}
                            value={
                              transforms.background.generativeFill.height ?? ""
                            }
                            onChange={e =>
                              updateBackground({
                                generativeFill: {
                                  ...transforms.background?.generativeFill,
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
                      </div>

                      {/* Crop Mode */}
                      <div className="space-y-2">
                        <Label className="text-xs font-medium">Crop Mode</Label>
                        <Select
                          value={
                            transforms.background.generativeFill.cropMode ??
                            "none"
                          }
                          onValueChange={value =>
                            updateBackground({
                              generativeFill: {
                                ...transforms.background?.generativeFill,
                                cropMode:
                                  value === "none"
                                    ? undefined
                                    : (value as "pad_resize" | "pad_extract"),
                              },
                            })
                          }
                        >
                          <SelectTrigger
                            className={inputStyles}
                            style={gradientBg}
                          >
                            <SelectValue placeholder="Select Crop Mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pad_resize">
                              Pad Resize
                            </SelectItem>
                            <SelectItem value="pad_extract">
                              Pad Extract
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                {/* Reset Background Button */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    onClick={resetBackground}
                    className={`flex-1 ${buttonStyles}`}
                    style={gradientBg}
                  >
                    Reset Background
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="editing">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <PenLine className="size-4" />
                Editing
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                {/* Prompt */}
                <div className="col-span-2 flex flex-col gap-3 p-2 justify-center">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Prompt</Label>
                    <Textarea
                      placeholder="Give a prompt for editing"
                      value={transforms.editing?.prompt || ""}
                      onChange={e =>
                        updateEditing({
                          prompt: e.target.value ? e.target.value : undefined,
                        })
                      }
                      className={textAreaStyles}
                      style={gradientBg}
                    />
                  </div>
                </div>

                {/* Retouch + Upscale */}
                <div
                  className="col-span-2 flex items-center justify-between  rounded-lg p-2"
                  style={gradientBg}
                >
                  <Label className="text-xs font-medium" id="retouch">
                    Retouch
                  </Label>
                  <Switch
                    id="retouch"
                    checked={!!transforms.editing?.retouch}
                    onCheckedChange={checked =>
                      updateEditing({retouch: checked ? true : undefined})
                    }
                  />
                </div>
                <div
                  className="col-span-2 flex items-center justify-between rounded-lg p-2"
                  style={gradientBg}
                >
                  <Label className="text-xs font-medium" id="upscale">
                    Upscale
                  </Label>
                  <Switch
                    id="upscale"
                    checked={!!transforms.editing?.upscale}
                    onCheckedChange={checked =>
                      updateEditing({upscale: checked ? true : undefined})
                    }
                  />
                </div>
              </div>
              {/* Reset Editing Button */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={resetEditing}
                  className={`flex-1 ${buttonStyles}`}
                  style={gradientBg}
                >
                  Reset Editing
                </Button>
              </div>{" "}
            </AccordionContent>
          </AccordionItem>
          {/* Shadow Lighting */}
          <AccordionItem value="shadowLighting">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Zap className="size-4" />
                Shadow Lighting
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-1 gap-3">
                {/* Azimuth */}
                <div className="flex flex-col gap-3 p-2 justify-center">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Azimuth{" "}
                      {transforms.shadowLighting?.dropShadow?.azimuth ?? 0}
                    </Label>
                    <Slider
                      min={0}
                      max={360}
                      step={1}
                      value={[
                        transforms.shadowLighting?.dropShadow?.azimuth || 0,
                      ]}
                      onValueChange={([value]) =>
                        updateShadowLighting({
                          azimuth: value === 0 ? undefined : value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Elevation */}
                <div className="flex flex-col gap-3 p-2 justify-center">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Elevation{" "}
                      {transforms.shadowLighting?.dropShadow?.elevation ?? 0}
                    </Label>
                    <Slider
                      min={0}
                      max={90}
                      step={1}
                      value={[
                        transforms.shadowLighting?.dropShadow?.elevation || 0,
                      ]}
                      onValueChange={([value]) =>
                        updateShadowLighting({
                          elevation: value === 0 ? undefined : value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Saturation */}
                <div className="flex flex-col gap-3 p-2 justify-center">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Saturation{" "}
                      {transforms.shadowLighting?.dropShadow?.saturation ?? 0}
                    </Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[
                        transforms.shadowLighting?.dropShadow?.saturation || 0,
                      ]}
                      onValueChange={([value]) =>
                        updateShadowLighting({
                          saturation: value === 0 ? undefined : value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              {/* Reset Shadow Lighting Button */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={resetShadowLighting}
                  className={`flex-1 ${buttonStyles}`}
                  style={gradientBg}
                >
                  Reset Shadow Lighting
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="generation">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Brain className="size-4" />
                Generation
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                {/* Text Prompt */}
                <div className="col-span-2 flex flex-col gap-3 p-2 justify-center">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Prompt</Label>
                    <Textarea
                      placeholder="Give a prompt for editing"
                      value={transforms.generation?.textPrompt || ""}
                      onChange={e =>
                        updateGeneration({
                          textPrompt: e.target.value
                            ? e.target.value
                            : undefined,
                        })
                      }
                      className={textAreaStyles}
                      style={gradientBg}
                    />
                  </div>
                </div>

                {/* Variation */}
                <div
                  className="col-span-2 flex items-center justify-between rounded-lg p-2"
                  style={gradientBg}
                >
                  <Label className="text-xs font-medium" id="variation">
                    Variation
                  </Label>
                  <Switch
                    id="variation"
                    checked={!!transforms.generation?.variation}
                    onCheckedChange={checked =>
                      updateGeneration({
                        variation: checked ? true : undefined,
                      })
                    }
                  />
                </div>
              </div>
              {/* Reset Generation Button */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={resetGeneration}
                  className={`flex-1 ${buttonStyles}`}
                  style={gradientBg}
                >
                  Reset Generation
                </Button>
              </div>{" "}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cropping">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Crop className="size-4" />
                AI Cropping
              </div>
            </AccordionTrigger>

            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 grid-rows-4 gap-3">
                {/* Crop Type */}
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-medium">Crop Type</Label>
                  <Select
                    value={transforms.cropping?.type || "none"}
                    onValueChange={value =>
                      updateCropping({
                        type:
                          value === "none"
                            ? undefined
                            : (value as "smart" | "face" | "object"),
                      })
                    }
                  >
                    <SelectTrigger className={inputStyles} style={gradientBg}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="smart">Smart Crop</SelectItem>
                      <SelectItem value="face">Face Crop</SelectItem>
                      <SelectItem value="object">Object-aware Crop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {/* Object Name */}
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-medium">Object Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter object name"
                    value={transforms.cropping?.objectName || ""}
                    onChange={e =>
                      updateCropping({
                        objectName: e.target.value || undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                {/* Zoom / Width / Height */}
                <div className="col-span-2 space-y-2">
                  <Label className="text-xs font-medium">
                    Zoom{" "}
                    {transforms.cropping?.zoom == undefined
                      ? "1.0x"
                      : `${transforms.cropping?.zoom.toFixed(1)}x`}
                  </Label>
                  <Slider
                    min={0.1}
                    max={5.0}
                    step={0.1}
                    value={[transforms.cropping?.zoom || 1]}
                    onValueChange={([value]) =>
                      updateCropping({zoom: value === 1 ? undefined : value})
                    }
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Width</Label>
                  <Input
                    type="number"
                    placeholder="Auto"
                    min={0}
                    value={transforms.cropping?.width || ""}
                    onChange={e =>
                      updateCropping({
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
                    min={0}
                    placeholder="Auto"
                    value={transforms.cropping?.height || ""}
                    onChange={e =>
                      updateCropping({
                        height: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>
              {/* Reset AI Cropping */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={resetCropping}
                  className={`flex-1 ${buttonStyles}`}
                  style={gradientBg}
                >
                  Reset AI Cropping
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

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
