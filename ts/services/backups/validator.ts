// Copyright 2024 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import * as libsignal from '@signalapp/libsignal-client/dist/MessageBackup';

import { strictAssert } from '../../util/assert';
import { toAciObject } from '../../util/ServiceId';
import { isTestOrMockEnvironment } from '../../environment';
import { FileStream } from './util/FileStream';

export async function validateBackup(
  filePath: string,
  fileSize: number
): Promise<void> {
  const masterKeyBase64 = window.storage.get('masterKey');
  strictAssert(masterKeyBase64, 'Master key not available');

  const masterKey = Buffer.from(masterKeyBase64, 'base64');

  const aci = toAciObject(window.storage.user.getCheckedAci());
  const backupKey = new libsignal.MessageBackupKey(masterKey, aci);

  const streams = new Array<FileStream>();

  let outcome: libsignal.ValidationOutcome;
  try {
    outcome = await libsignal.validate(
      backupKey,
      libsignal.Purpose.RemoteBackup,
      () => {
        const stream = new FileStream(filePath);
        streams.push(stream);
        return stream;
      },
      BigInt(fileSize)
    );
  } finally {
    await Promise.all(streams.map(stream => stream.close()));
  }

  if (isTestOrMockEnvironment()) {
    strictAssert(
      outcome.ok,
      `Backup validation failed: ${outcome.errorMessage}`
    );
  } else {
    strictAssert(outcome.ok, 'Backup validation failed');
  }
}