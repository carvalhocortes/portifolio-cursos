import { CoursesModules } from '@/modules/addCoursesModules/components'
import React from 'react'

export default function Course({ params }: { params: { id: string } }) {
  return <CoursesModules id={params.id} />
}
