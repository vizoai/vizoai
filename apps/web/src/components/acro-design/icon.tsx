import { Icon as ArcoIcon } from '@arco-design/web-react'
import { cloneElement, createElement, CSSProperties, ForwardRefExoticComponent, isValidElement, RefAttributes, SVGAttributes } from 'react';
import { IconNode, LucideProps } from 'lucide-react'

export interface IconProps extends Omit<SVGAttributes<SVGElement>, 'className'> {
  style?: CSSProperties;
  type?: string;
  spin?: boolean;
  className?: string | string[];
  icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

export const Icon = (props: IconProps) => {
  const { height = 14, width = 14, children, icon: IconComponent, ...rest } = props || {}
  return <ArcoIcon {...rest} suppressHydrationWarning>
    {IconComponent ? createElement(IconComponent, { width, height } as SVGAttributes<SVGSVGElement>)
      : children}
  </ArcoIcon>
}
