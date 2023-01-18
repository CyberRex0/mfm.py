from setuptools import setup
from setuptools.command.install import install
import subprocess
import traceback
import os
import shutil

class InstallCmd(install):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
    
    def run(self):
        # Build mfm.js
        self._run_cmd(['npm', 'install'])
        self._run_cmd(['npm', 'run', 'build'])
        shutil.copyfile('loader.js', 'built/loader.js')

        import js2py
        js2py.translate_file('bundled.js', 'mfmjs.py')

        try:
            os.mkdir('mfmpy')
        except FileExistsError:
            pass
        os.rename('mfmjs.py', 'mfmpy/mfmjs.py')

        install.run(self)
    
    def _run_cmd(self, args, **kwargs):
        try:
            subprocess.run(args, **kwargs)
        except subprocess.CalledProcessError:
            traceback.print_exc()
            print('build failed')
            exit(1)
        



setup(
    name="mfm.py",
    version="0.0.1",
    install_requires=["js2py==0.74"],
    license="MIT",
    description="Run mfm.js natively on Python",
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.8',
        'Programming Language :: Python :: 3.9',
        'Programming Language :: Python :: 3.10',
        'Topic :: Internet',
        'Topic :: Software Development :: Libraries',
        'Topic :: Software Development :: Libraries :: Python Modules',
        'Topic :: Utilities'
    ],
    packages=["mfmpy"],
    package_dir={"mfmpy": "mfmpy"},
    cmdclass={"install": InstallCmd}
)
