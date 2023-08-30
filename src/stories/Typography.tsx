import { Text } from "@/components/ui/text";

export const Typography: React.FC = () => {
  return (
    <section>
      <section className="mb-14">
        <div className="grid grid-cols-4 gap-10">
          <Text weight="medium" variant="text/xs">
            REGULAR (400 - default)
          </Text>
          <Text weight="medium" variant="text/xs">
            MEDIUM (500)
          </Text>
          <Text weight="medium" variant="text/xs">
            BOLD (700)
          </Text>
          <Text weight="medium" variant="text/xs">
            X-BOLD/Black (700)
          </Text>
        </div>
      </section>
      <section className="mb-14">
        <div className="flex justify-between mb-14">
          <Text as="h1" weight="medium" variant="text/xs">
            Display 2XL
          </Text>
          <Text weight="medium" variant="text/xs">
            Font Size: 72PX | Line Height: 90PX
          </Text>
        </div>
        <div className="grid grid-cols-4 gap-10">
          <Text as="h1" variant="display/2xl">
            Display 2XL
          </Text>
          <Text as="h1" variant="display/2xl" weight="medium">
            Display 2XL
          </Text>
          <Text as="h1" variant="display/2xl" weight="bold">
            Display 2XL
          </Text>
          <Text as="h1" variant="display/2xl" weight="x-bold">
            Display 2XL
          </Text>
        </div>
      </section>

      <section className="mb-14">
        <div className="flex justify-between mb-14">
          <Text weight="medium" variant="text/xs">
            Display XL
          </Text>
          <Text weight="medium" variant="text/xs">
            Font Size: 60PX | Line Height: 72PX
          </Text>
        </div>
        <div className="grid grid-cols-4 gap-10">
          <Text as="h2" variant="display/xl">
            Display XL
          </Text>
          <Text as="h2" variant="display/xl" weight="medium">
            Display XL
          </Text>
          <Text as="h2" variant="display/xl" weight="bold">
            Display XL
          </Text>
          <Text as="h2" variant="display/xl" weight="x-bold">
            Display XL
          </Text>
        </div>
      </section>

      <section className="mb-14">
        <div className="flex justify-between mb-14">
          <Text weight="medium" variant="text/xs">
            TEXT XL
          </Text>
          <Text weight="medium" variant="text/xs">
            Font Size: 20PX | Line Height: 30PX
          </Text>
        </div>
        <div className="grid grid-cols-4 gap-10">
          <Text variant="text/xl">Text XL</Text>
          <Text variant="text/xl" weight="medium">
            Text XL
          </Text>
          <Text variant="text/xl" weight="bold">
            Text XL
          </Text>
          <Text variant="text/xl" weight="x-bold">
            Text XL
          </Text>
        </div>
      </section>

      <section className="mb-14">
        <div className="flex justify-between mb-14">
          <Text weight="medium" variant="text/xs">
            TEXT LG
          </Text>
          <Text weight="medium" variant="text/xs">
            Font Size: 18PX | Line Height: 28PX
          </Text>
        </div>
        <div className="grid grid-cols-4 gap-10">
          <Text variant="text/lg">Text XL</Text>
          <Text variant="text/lg" weight="medium">
            Text LG
          </Text>
          <Text variant="text/lg" weight="bold">
            Text LG
          </Text>
          <Text variant="text/lg" weight="x-bold">
            Text LG
          </Text>
        </div>
      </section>
    </section>
  );
};
