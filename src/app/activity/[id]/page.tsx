import { notFound } from 'next/navigation';
import {
  activityService,
  ActivityNotFoundError,
  InvalidActivityParameterError,
} from '@/services';
import {
  ActivityInteractiveProvider,
  Overview,
  StatusCard,
  ParticipantsList,
  Header,
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
      {/* 
        Interactive Demo Limitation:
        This is a client-side prototype without authentication. Users can edit
        any participant's status by matching their name. In a production app,
        this would be protected by proper authentication and authorization.
      */}
      <div className="text-foreground min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header title={activity.title} />
        <main className="mx-auto grid max-w-5xl gap-3 px-4 py-6 md:grid-cols-12 lg:gap-4">
          <section className="flex flex-col gap-3 md:col-span-5 lg:col-span-4 lg:gap-4">
            <Overview />
            <StatusCard />
          </section>
          <section className="md:col-span-7 lg:col-span-8">
            <ParticipantsList />
          </section>
        </main>
      </div>
    </ActivityInteractiveProvider>
  );
}
