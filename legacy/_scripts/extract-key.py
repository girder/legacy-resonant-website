import json
import sys


def main():
    data = json.loads(sys.stdin.read())
    sys.stdout.write('%s\n' % (data['authToken']['token']))

    return 0


if __name__ == '__main__':
    sys.exit(main())
