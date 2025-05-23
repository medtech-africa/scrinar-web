'use client'
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Text } from './text'
import RectSelect, {
  components,
  Props,
  OptionProps,
  GroupBase,
} from 'react-select'
import RectSelectASync, { AsyncProps } from 'react-select/async'
import colors from '@/constants/colors'
import CreatableSelect from 'react-select/creatable'

const inputVariants = cva(
  'py-[10px] px-2 text-xs !rounded-lg border !border-grey-300 !bg-white !placeholder:text-grey-500 !text-grey-900',
  {
    variants: {
      variant: {
        default: '',
        destructive: '!border-carmine-pink-red-500',
      },
      isFocused: {
        inactive: '!utils-focus-outset',
        active: '!focus-outset',
      },
      disabled: {
        false: '',
        true: '!bg-grey-50 !text-grey-500',
      },
    },
    defaultVariants: {
      variant: 'default',
      isFocused: 'inactive',
    },
  }
)

const InputOption = ({
  getStyles,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: OptionProps) => {
  const [isActive, setIsActive] = React.useState(false)
  const onMouseDown = () => setIsActive(true)
  const onMouseUp = () => setIsActive(false)
  const onMouseLeave = () => setIsActive(false)

  // styles
  let bg = 'transparent'
  if (isFocused) bg = '#fff'
  if (isActive) bg = '#ECF1F4'

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex ',
  }

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  }

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <>
        <input
          type="checkbox"
          checked={isSelected}
          className="mr-2"
          title={'checkbox'}
        />
        {children}
      </>
    </components.Option>
  )
}

interface CommonProps extends VariantProps<typeof inputVariants> {
  full?: boolean
  label?: string
  message?: string
  leadingIcon?: React.ReactNode
  labelStyle?: string
  customOption?: boolean
  isCreatable?: boolean
}

interface AllAsyncProps
  extends AsyncProps<unknown, boolean, GroupBase<unknown>>,
    CommonProps {
  isAsync: true
}

interface AllNonAsyncProps extends Props, CommonProps {
  isAsync?: false
}
export type SelectProps = AllAsyncProps | AllNonAsyncProps

const Select = React.forwardRef<typeof RectSelect, SelectProps>(
  (
    {
      className,
      variant,
      full = true,
      message,
      leadingIcon,
      label,
      labelStyle,
      customOption,
      isAsync,
      isCreatable,
      ...props
    },
    ref
  ) => {
    const Comp = isAsync
      ? RectSelectASync
      : isCreatable
        ? CreatableSelect
        : RectSelect

    return (
      <div>
        {!!label && (
          <label
            htmlFor={props.name}
            className={cn(
              'text-grey-900 lg:text-sm text-xs mb-2 block',
              labelStyle
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <span className=" absolute flex items-center left-[14px] top-0 bottom-0 text-grey-900 z-30">
            {leadingIcon}
          </span>
          <Comp
            ref={ref as any}
            {...props}
            classNames={{
              container: () => '!rounded-lg',
              valueContainer: () => '!p-0',
              indicatorsContainer: () => 'h-6',
              input: () => '!p-0 !my-0',
              indicatorSeparator: () => 'hidden',

              control: (state) =>
                cn(
                  inputVariants({
                    variant,
                    className,
                    isFocused: state.isFocused ? 'active' : 'inactive',
                    disabled: state.isDisabled,
                  }),
                  full && 'w-full',
                  !!leadingIcon && 'pl-[42px]'
                ),
            }}
            defaultValue={[]}
            components={
              customOption
                ? {
                    Option: InputOption,
                  }
                : undefined
            }
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: colors.lust[900],
                primary25: colors.lust[50],
              },
            })}
            {...props}
          />
        </div>

        {!message && isCreatable && (
          <Text className={cn('text-grey-500 mt-1 ml-3')} variant="text/sm">
            You can create a new option by typing
          </Text>
        )}

        {!!message && (
          <Text
            className={cn(
              'text-grey-500 mt-[6px]',
              variant === 'destructive' && 'text-error-500'
            )}
            variant="text/sm"
          >
            {message}
          </Text>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'
export { Select, inputVariants }
