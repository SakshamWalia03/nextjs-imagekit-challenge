/* eslint-disable @typescript-eslint/no-explicit-any */
import {Layers, Palette, Sparkles} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Slider} from "@/components/ui/slider";
import {type Enhancements} from "@/types/image-transformations";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const backgroundType = [
  {label: "Solid", value: "solid"},
  {label: "Blurred", value: "blurred"},
  {label: "Dominant", value: "dominant"},
];

type EnhancementControlsProps = {
  transforms: Enhancements;
  onTransformChange: (transforms: Enhancements) => void;
};

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function ImageEnhancementPanel({
  transforms,
  onTransformChange,
}: EnhancementControlsProps) {
  const update = (patch: Partial<Enhancements>) => {
    onTransformChange({...transforms, ...patch});
  };

  const updateShadow = (
    patch: Partial<NonNullable<Enhancements["shadow"]>>
  ) => {
    update({
      shadow: {
        ...transforms.shadow,
        ...patch,
      },
    });
  };

  const updateBackground = (
    patch: Partial<NonNullable<Enhancements["background"]>>
  ) => {
    update({
      background: {
        ...transforms.background,
        ...patch,
      },
    });
  };

  const resetAll = () => {
    update({
      blur: undefined,
      sharpen: undefined,
      shadow: undefined,
      background: undefined,
    });
  };

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <div>
        <Accordion type="multiple">
          {/* Enhancements */}
          <AccordionItem value="enhancements">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Enhancements
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                {/* Blur */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Blur{" "}
                    {transforms.blur
                      ? `${transforms.blur.toFixed(1)}x`
                      : "0.0x"}
                  </Label>
                  <Slider
                    min={0}
                    max={15}
                    step={0.1}
                    value={[transforms.blur || 0]}
                    onValueChange={([value]) =>
                      update({blur: value === 0 ? undefined : value})
                    }
                    className="w-full"
                  />
                </div>
                {/* Sharpen */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Sharpen{" "}
                    {transforms.sharpen
                      ? `${transforms.sharpen.toFixed(1)}x`
                      : "0.0x"}
                  </Label>
                  <Slider
                    min={0}
                    max={15}
                    step={0.1}
                    value={[transforms.sharpen || 0]}
                    onValueChange={([value]) =>
                      update({sharpen: value === 0 ? undefined : value})
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Shadow */}
          <AccordionItem value="shadow">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Layers className="size-4" />
                Shadow
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-4">
                {/* Shadow Blur */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Blur{" "}
                    {transforms.shadow?.blur
                      ? `${transforms.shadow.blur.toFixed(1)}x`
                      : "0.0x"}
                  </Label>
                  <Slider
                    min={0}
                    max={15}
                    step={1}
                    value={[transforms.shadow?.blur || 0]}
                    onValueChange={([value]) =>
                      updateShadow({blur: value === 0 ? undefined : value})
                    }
                    className="w-full"
                  />
                </div>
                {/* Shadow Saturation */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Saturation{" "}
                    {transforms.shadow?.saturation
                      ? `${transforms.shadow.saturation.toFixed(1)}x`
                      : "0.0"}
                  </Label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[transforms.shadow?.saturation || 0]}
                    onValueChange={([value]) =>
                      updateShadow({
                        saturation: value === 0 ? undefined : value,
                      })
                    }
                    className="w-full"
                  />
                </div>
                {/* Shadow OffsetX */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    OffsetX {transforms.shadow?.offsetX || 0}
                  </Label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[transforms.shadow?.offsetX || 0]}
                    onValueChange={([value]) =>
                      updateShadow({offsetX: value === 0 ? undefined : value})
                    }
                    className="w-full"
                  />
                </div>
                {/* Shadow OffsetY */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    OffsetY {transforms.shadow?.offsetY || 0}
                  </Label>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={[transforms.shadow?.offsetY || 0]}
                    onValueChange={([value]) =>
                      updateShadow({offsetY: value === 0 ? undefined : value})
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* background */}
          {/* Background */}
          <AccordionItem value="background">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Palette className="size-4" />
                Background
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-4">
                {/* Background Type */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Type</Label>
                  <Select
                    value={transforms.background?.type}
                    onValueChange={value =>
                      updateBackground({type: value as any})
                    }
                  >
                    <SelectTrigger className={inputStyles} style={gradientBg}>
                      <SelectValue placeholder="Select background type" />
                    </SelectTrigger>
                    <SelectContent>
                      {backgroundType.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Background Color */}
                {transforms.background?.type === "solid" && (
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Color</Label>
                    <input
                      type="color"
                      value={transforms.background?.color || "FFFFFF"}
                      onChange={e => updateBackground({color: e.target.value})}
                      className="w-full h-8 rounded cursor-pointer border-none"
                    />
                  </div>
                )}

                {/* Background Blur Intensity */}
                {transforms.background?.type === "blurred" && (
                  <div className="space-y-2 col-span-2">
                    <Label className="text-xs font-medium">
                      Blur Intensity{" "}
                      {transforms.background?.blurIntensity &&
                      transforms.background.blurIntensity !== "auto"
                        ? `${transforms.background.blurIntensity}`
                        : "auto"}
                    </Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[
                        typeof transforms.background?.blurIntensity === "number"
                          ? transforms.background.blurIntensity
                          : 0,
                      ]}
                      onValueChange={([value]) =>
                        updateBackground({
                          blurIntensity: value === 0 ? "auto" : value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                )}

                {/* Background Brightness */}
                <div className="space-y-2 col-span-2">
                  <Label className="text-xs font-medium">
                    Brightness {transforms.background?.brightness || 0}
                  </Label>
                  <Slider
                    min={-255}
                    max={255}
                    step={1}
                    value={[transforms.background?.brightness || 0]}
                    onValueChange={([value]) =>
                      updateBackground({
                        brightness: value === 0 ? undefined : value,
                      })
                    }
                    className="w-full"
                  />
                </div>
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
