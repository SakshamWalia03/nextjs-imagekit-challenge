/* eslint-disable @typescript-eslint/no-explicit-any */
import {Palette} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {type Audio} from "@/types/video-transformations";

import {Switch} from "../ui/switch";

type AudioControlsProps = {
  transforms: Audio;
  onTransformChange: (transforms: Audio) => void;
};

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function AudioPanel({
  transforms,
  onTransformChange,
}: AudioControlsProps) {
  const update = (patch: Partial<Audio>) => {
    onTransformChange({...transforms, ...patch});
  };

  const reset = () => update({mute: undefined, extractAudio: undefined});

  return (
    <div className="h-full flex flex-col md:overflow-y-scroll space-y-1 scrollbar-thin scrollbar-thumb-gray-300">
      <Accordion type="multiple">
        {/* Audio Settings */}
        <AccordionItem value="audioSetting">
          <AccordionTrigger className="py-3 cursor-pointer">
            <div className="flex items-center gap-2">
              <Palette className="size-4" />
              Audio Setting
            </div>
          </AccordionTrigger>

          <AccordionContent className="space-y-4 pt-2 px-0.5">
            <div className="grid grid-cols-1 gap-3">
              {/* Mute */}
              <div
                className="flex items-center justify-between rounded-lg p-3"
                style={gradientBg}
              >
                <Label className="text-xs font-medium" id="mute">
                  Mute
                </Label>
                <Switch
                  id="mute"
                  checked={!!transforms.mute}
                  onCheckedChange={checked =>
                    update({mute: checked ? true : undefined})
                  }
                />
              </div>

              {/* Extract Audio */}
              <div
                className="flex items-center justify-between rounded-lg p-3"
                style={gradientBg}
              >
                <Label className="text-xs font-medium" id="extractAudio">
                  Extract Audio
                </Label>
                <Switch
                  id="extractAudio"
                  checked={!!transforms.extractAudio}
                  onCheckedChange={checked =>
                    update({extractAudio: checked ? true : undefined})
                  }
                />
              </div>
            </div>

            {/* Reset Audio Button */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={reset}
                className={`flex-1 ${buttonStyles}`}
                style={gradientBg}
              >
                Reset Audio
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Reset All Button */}
      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={reset}
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
