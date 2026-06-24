import { useState, useRef } from 'react';
import {
  Stack, Title, Text, SimpleGrid, Card, Group, Badge, Button, Box,
  Progress, Alert, Modal, Divider,
} from '@mantine/core';
import { IconAward, IconDownload, IconCheck, IconLock } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { certificateDefinitions, getModuleById } from '../../content';
import { useProgressStore } from '../../stores/progress.store';
import { downloadCertificateAsPng, downloadCertificateAsPdf } from '../../utils/certificate.generator';
import { notifications } from '@mantine/notifications';

export default function Certification() {
  const { certificates, getModuleProgress } = useProgressStore();
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [opened, { open: openModal, close: closeModal }] = useDisclosure(false);

  const selectedCert = selectedCertId ? certificateDefinitions.find((c) => c.id === selectedCertId) : null;
  const earnedRecord = selectedCertId ? certificates[selectedCertId] : null;

  function handleViewCert(certId: string) {
    setSelectedCertId(certId);
    openModal();
  }

  async function handleDownloadPng() {
    if (!selectedCert || !earnedRecord) return;
    setDownloading(true);
    try {
      await downloadCertificateAsPng(selectedCert, useProgressStore.getState(), 'QA Engineer');
      notifications.show({ title: 'Downloaded!', message: 'Certificate saved as PNG.', color: 'green' });
    } catch {
      notifications.show({ title: 'Download failed', message: 'Please try again.', color: 'red' });
    }
    setDownloading(false);
  }

  async function handleDownloadPdf() {
    if (!selectedCert || !earnedRecord) return;
    setDownloading(true);
    try {
      await downloadCertificateAsPdf(selectedCert, useProgressStore.getState(), 'QA Engineer');
      notifications.show({ title: 'Downloaded!', message: 'Certificate saved as PDF.', color: 'green' });
    } catch {
      notifications.show({ title: 'Download failed', message: 'Please try again.', color: 'red' });
    }
    setDownloading(false);
  }

  const earnedCount = Object.keys(certificates).length;

  return (
    <Stack gap="lg">
      <Box>
        <Title order={2} mb={4}>Certifications 🏆</Title>
        <Text c="dimmed">
          Earn certificates by completing modules with 80%+ quiz scores.
          {earnedCount > 0 && ` You have earned ${earnedCount} of ${certificateDefinitions.length} certificates.`}
        </Text>
      </Box>

      {earnedCount === 0 && (
        <Alert icon={<IconAward size={16} />} color="violet" title="Start earning your first certificate">
          Complete Module 2 (JavaScript for QAs) with 80%+ on the final quiz to earn the JavaScript Explorer certificate.
        </Alert>
      )}

      {earnedCount === certificateDefinitions.length && (
        <Alert icon={<IconCheck size={16} />} color="green" title="🎉 All certificates earned!">
          Congratulations! You have completed the entire Playwright Bridge Academy curriculum!
        </Alert>
      )}

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
        {certificateDefinitions.map((cert) => {
          const earned = certificates[cert.id];
          const module = getModuleById(`module-${cert.level + 1}`);
          const moduleProgress = module
            ? getModuleProgress(module.lessons.map((l) => l.id))
            : { percentage: 0, completed: 0, total: 0 };

          return (
            <Card
              key={cert.id}
              p="lg"
              withBorder
              style={{
                background: earned ? cert.gradient : undefined,
                color: earned ? '#fff' : undefined,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background decoration */}
              {earned && (
                <Box
                  style={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    fontSize: 80,
                    opacity: 0.1,
                    pointerEvents: 'none',
                  }}
                >
                  {cert.icon}
                </Box>
              )}

              <Group gap="sm" mb="md">
                <Text size="2rem">{cert.icon}</Text>
                <Box>
                  <Text fw={700} c={earned ? 'white' : undefined}>{cert.title}</Text>
                  <Text size="xs" c={earned ? 'rgba(255,255,255,0.8)' : 'dimmed'}>{cert.subtitle}</Text>
                </Box>
              </Group>

              <Text size="sm" c={earned ? 'rgba(255,255,255,0.9)' : 'dimmed'} mb="md" lineClamp={2}>
                {cert.description}
              </Text>

              {earned ? (
                <>
                  <Badge color="white" variant="filled" c="dark" mb="md" leftSection={<IconCheck size={12} />}>
                    Earned {new Date(earned.earnedAt).toLocaleDateString()}
                  </Badge>
                  <Button
                    fullWidth
                    size="sm"
                    variant="white"
                    color="dark"
                    leftSection={<IconDownload size={16} />}
                    onClick={() => handleViewCert(cert.id)}
                  >
                    View & Download
                  </Button>
                </>
              ) : (
                <>
                  {module && (
                    <>
                      <Text size="xs" c="dimmed" mb={4}>Module progress: {moduleProgress.percentage}%</Text>
                      <Progress value={moduleProgress.percentage} size="sm" mb="md" />
                    </>
                  )}
                  <Group gap="xs" mb="sm">
                    <IconLock size={14} color="var(--mantine-color-gray-5)" />
                    <Text size="xs" c="dimmed">Requires 80%+ quiz score</Text>
                  </Group>
                  <Button fullWidth size="sm" variant="light" disabled leftSection={<IconAward size={16} />}>
                    Not yet earned
                  </Button>
                </>
              )}
            </Card>
          );
        })}
      </SimpleGrid>

      <Divider label="Requirements" labelPosition="left" />

      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
        {certificateDefinitions.map((cert) => (
          <Card key={cert.id} p="md" withBorder>
            <Group gap="xs" mb="xs">
              <Text>{cert.icon}</Text>
              <Text fw={600} size="sm">{cert.title}</Text>
            </Group>
            <Text size="xs" c="dimmed" mb="xs">Level {cert.level} Certificate</Text>
            <Text size="xs" c="dimmed">
              • Complete all lessons in Module {cert.level + 1}<br />
              • Score 80%+ on the final quiz<br />
              • Certificate downloads as PNG or PDF
            </Text>
          </Card>
        ))}
      </SimpleGrid>

      {/* Certificate Modal */}
      <Modal
        opened={opened}
        onClose={closeModal}
        title={selectedCert?.title ?? ''}
        size="xl"
        centered
      >
        {selectedCert && earnedRecord && (
          <Stack gap="md">
            {/* Certificate Preview */}
            <Box
              id="certificate-canvas"
              style={{
                width: '100%',
                aspectRatio: '842/595',
                background: selectedCert.gradient,
                borderRadius: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'Georgia, serif',
                padding: 40,
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <Text size="3rem" mb="xs">{selectedCert.icon}</Text>
              <Text size="xs" style={{ letterSpacing: 4, textTransform: 'uppercase', opacity: 0.8 }} mb={4}>
                Playwright Bridge Academy
              </Text>
              <Text size="xl" fw={700} mb={4}>{selectedCert.title}</Text>
              <Text size="sm" style={{ opacity: 0.9 }} mb="lg">{selectedCert.subtitle}</Text>
              <Box style={{ width: 80, height: 2, background: 'rgba(255,255,255,0.5)' }} mb="lg" />
              <Text size="xs" style={{ opacity: 0.8 }} mb={4}>This certifies that</Text>
              <Text size="xl" fw={700} mb="md">QA Engineer</Text>
              <Text size="xs" style={{ opacity: 0.8, maxWidth: 400 }}>{selectedCert.description}</Text>
              <Text size="xs" mt="md" style={{ opacity: 0.7 }}>
                Awarded on {new Date(earnedRecord.earnedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
              </Text>
            </Box>

            <Group justify="center" gap="md">
              <Button
                leftSection={<IconDownload size={16} />}
                onClick={handleDownloadPng}
                loading={downloading}
                variant="light"
              >
                Download PNG
              </Button>
              <Button
                leftSection={<IconDownload size={16} />}
                onClick={handleDownloadPdf}
                loading={downloading}
              >
                Download PDF
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>
    </Stack>
  );
}
