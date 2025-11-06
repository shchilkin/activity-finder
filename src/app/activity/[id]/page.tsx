import { notFound } from 'next/navigation';
import {
  activityService,
  ActivityNotFoundError,
  InvalidActivityParameterError,
} from '@/services';
import {
  ActivityInteractiveProvider,
  ActivityOverview,
  ActivityStatusCard,
  ParticipantsList,
  ActivityHeader,
} from '@/components/ActivityDetails';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ActivityDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const activityId = parseInt(id, 10);

  // Return 404 if ID is not a valid number
  if (isNaN(activityId)) {
    notFound();
  }

  // Fetch activity with error handling
  let activity;
  try {
    activity = await activityService.getActivityById(activityId);
  } catch (error) {
    if (
      error instanceof ActivityNotFoundError ||
      error instanceof InvalidActivityParameterError
    ) {
      notFound();
    }
    // Re-throw other errors to be handled by error boundary
    throw error;
  }

  return (
    <ActivityInteractiveProvider activity={activity}>
      <div className="text-foreground min-h-screen bg-gray-100">
        {/* Top bar */}
        <ActivityHeader title={activity.title} />

        {/* Content area */}
        <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-12">
          {/* Left: Overview & Status */}
          <section className="flex flex-col gap-6 md:col-span-5 lg:col-span-4">
            {/* Overview - Interactive */}
            <ActivityOverview />

            {/* Your Status - Interactive */}
            <ActivityStatusCard />
          </section>

          {/* Right: Participants */}
          <section className="md:col-span-7 lg:col-span-8">
            <ParticipantsList />
          </section>
        </main>
      </div>
    </ActivityInteractiveProvider>
  );
}
