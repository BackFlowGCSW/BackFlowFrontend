'use client';

import dynamic from 'next/dynamic';
import moment from 'moment';
import type {
  ReactCalendarTimelineProps,
  TimelineItemBase,
  TimelineGroupBase,
} from 'react-calendar-timeline';
import '@/styles/timeline.css';

const Timeline = dynamic(
  () =>
    import('react-calendar-timeline').then(
      (mod) =>
        mod.default as unknown as React.ComponentType<
          ReactCalendarTimelineProps<TimelineItemBase<number>, TimelineGroupBase>
        >
    ),
  { ssr: false }
);

const groups = [{ id: 1, title: 'Tareas' }];

const items = [
  {
    id: 1,
    group: 1,
    title: 'Diseñar interfaz',
    start_time: moment('2025-05-14T08:00').valueOf(),
    end_time: moment('2025-05-14T12:00').valueOf(),
  },
  {
    id: 2,
    group: 1,
    title: 'Crear componente de login',
    start_time: moment('2025-05-13T10:00').valueOf(),
    end_time: moment('2025-05-13T14:00').valueOf(),
  },
  {
    id: 3,
    group: 1,
    title: 'Revisar documentación',
    start_time: moment('2025-05-12T09:00').valueOf(),
    end_time: moment('2025-05-12T11:00').valueOf(),
  },
];

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupLabelKey: '',
  groupRightTitleKey: '',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start_time',
  itemTimeEndKey: 'end_time',
  itemDivTitleKey: '',
};

export default function TimelineCronograma() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Cronograma de Tareas</h2>
      <Timeline
        groups={groups}
        items={items}
        keys={keys}
        defaultTimeStart={moment('2025-05-11').valueOf()}
        defaultTimeEnd={moment('2025-05-15').valueOf()}
        sidebarWidth={150}
        rightSidebarWidth={0}
        lineHeight={60}
        canMove={false}
        canResize={false}
        itemHeightRatio={0.75}
        minZoom={60 * 60 * 1000} // 1 hora
        maxZoom={7 * 24 * 60 * 60 * 1000} // 7 días
        stackItems={true}
        timeSteps={{
          second: 1,
          minute: 5,
          hour: 1,
          day: 1,
          month: 1,
          year: 1,
        }}
      />
    </div>
  );
}
